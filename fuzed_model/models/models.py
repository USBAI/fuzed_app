import mediapipe as mp
import cv2
import numpy as np
import base64
from collections import deque

class PushupsModel:
    def __init__(self):
        # MediaPipe Pose setup
        self.mp_pose = mp.solutions.pose
        self.pose = self.mp_pose.Pose(min_detection_confidence=0.7, min_tracking_confidence=0.7)
        self.pushup_count = 0
        # 'up' or 'down'
        self.direction = None 
        '''For smoothing angles'''
        self.smooth_angle = deque(maxlen=5)

    @staticmethod
    def calculate_angle(a, b, c):
        """
        Calculate the angle between three points: a (shoulder), b (elbow), and c (wrist).
        """
        a = np.array(a)  # Shoulder
        b = np.array(b)  # Elbow
        c = np.array(c)  # Wrist

        radians = np.arctan2(c[1] - b[1], c[0] - b[0]) - np.arctan2(a[1] - b[1], a[0] - b[0])
        angle = np.abs(radians * 180.0 / np.pi)

        if angle > 180.0:
            angle = 360 - angle

        return angle

    def smooth_angles(self, angle):
        """
        Smooth the angle values using a sliding window.
        """
        self.smooth_angle.append(angle)
        return np.mean(self.smooth_angle)

    def process_frame(self, frame_data):
        """
        Process the incoming frame data and calculate the push-up count.
        """
        try:
            img_data = base64.b64decode(frame_data)
            np_arr = np.frombuffer(img_data, np.uint8)
            frame = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

            if frame is None:
                return {'error': 'Failed to decode frame'}

            # Processing the frames with MediaPipe Pose
            rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            result = self.pose.process(rgb_frame)

            if result.pose_landmarks:
                landmarks = result.pose_landmarks.landmark

                # Extracting relevant joint coordinates (left arm as default)
                left_shoulder = [landmarks[self.mp_pose.PoseLandmark.LEFT_SHOULDER.value].x,
                                 landmarks[self.mp_pose.PoseLandmark.LEFT_SHOULDER.value].y]
                left_elbow = [landmarks[self.mp_pose.PoseLandmark.LEFT_ELBOW.value].x,
                              landmarks[self.mp_pose.PoseLandmark.LEFT_ELBOW.value].y]
                left_wrist = [landmarks[self.mp_pose.PoseLandmark.LEFT_WRIST.value].x,
                              landmarks[self.mp_pose.PoseLandmark.LEFT_WRIST.value].y]

                elbow_angle = self.calculate_angle(left_shoulder, left_elbow, left_wrist)
                smoothed_angle = self.smooth_angles(elbow_angle)

                # Push-up counting logic with thresholds
                if smoothed_angle > 165:  
                    if self.direction == "down":
                        self.pushup_count += 1  
                    self.direction = "up"
                elif smoothed_angle < 80:  
                    self.direction = "down"

                # Quality feedback (optional)
                feedback = "Good form" if 80 <= smoothed_angle <= 165 else "Adjust your form"

                return {'count': self.pushup_count, 'feedback': feedback, 'angle': smoothed_angle}

            return {'count': self.pushup_count, 'feedback': 'No landmarks detected'}

        except Exception as e:
            return {'error': str(e)}
