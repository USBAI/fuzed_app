from flask import Flask, request
from flask_sock import Sock
from models.models import PushupsModel
import json

app = Flask(__name__)
sock = Sock(app)

'''
importing the pushups model <<
'''
pushups_model = PushupsModel()

@sock.route('/ws/movementdetection/pushupmodel/')
def pushup_model_socket(ws):
    """
    WebSocket route for processing video frames and sending push-up count.
    """
    try:
        while True:
            data = ws.receive()
            if not data:
                break

            payload = json.loads(data)
            frame_data = payload.get("frame")

            if not frame_data:
                ws.send(json.dumps({"error": "No frame data received"}))
                continue

            # Processing the frame with the PushupsModel
            result = pushups_model.process_frame(frame_data)

            ws.send(json.dumps(result))
    except Exception as e:
        ws.send(json.dumps({"error": str(e)}))

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8000)
