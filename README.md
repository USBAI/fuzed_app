# Fuzed

## Quick Information
Hey there! Fuzed is an app I built using the Expo framework. While I focused mainly on developing and fine-tuning the app's model rather than the UI design, it's designed to provide an interactive fitness experience using computer vision.

Due to some compatibility challenges between Windows and iOS devices, particularly around camera permissions, I created a web application using ReactJS that connects to the same backend server. This web version helps demonstrate how the model works while I address the mobile platform specifics.

I'm excited to share that my MacBook arrives today! This will allow me to transfer the development environment over and properly debug the camera permission issues that arise between Windows and iOS devices. Having a MacBook will enable seamless development for both iOS and Android platforms.

![Web Application](./assets/macbook-smooth-lid-drop.png)
Here's a [link to a YouTube video](https://youtu.be/YobP0VaoBE0?si=mjDVPXSZxf_thlnL) where you can see how the web app works.

---

## App Preview
Check out some screenshots from the app:

![Home page](./assets/iphone-spin-freeze-tme.png)
![Challange Select](./assets/iphone-15-still%20(1).png)
![Camera Show Up](./assets/iphone-15-still.png)
![Allow Cammera Access](./assets/iphone-coin-spin.png)

---

## How to Run the App Locally
If you want to try it out on your local machine, here's what you need to do:

1. Clone the repository:
   ```bash
   git clone git@github.com:USBAI/fuzed_app.git
   ```

2. Go into the project folder:
   ```bash
   cd fuzed_app
   ```

3. Make sure you have Expo CLI installed globally. If you don't, you can install it by running:
   ```bash
   npm install -g expo-cli
   ```

4. Install all the project dependencies:
   ```bash
   npm install
   ```

5. Install the required Expo modules used in the app. These include:
   - `expo-camera` for accessing the device camera.
   - `expo-location` for handling location-based features.
   - `expo-linear-gradient` for gradient effects in the UI.
   - `@react-navigation/native` for navigation within the app.
   - `expo-permissions` to handle permissions for camera and location.
   - `expo-constants` for accessing app constants like manifest details.
   You can install these with:
   ```bash
   npm install expo-camera expo-location expo-linear-gradient @react-navigation/native expo-permissions expo-constants
   ```

6. Start the development server:
   ```bash
   npm start
   ```

7. Use the Expo Go app on your phone to scan the QR code and run the app, or use an emulator (iOS or Android) as guided by Expo CLI.

---

## What's Next
Once my MacBook arrives, I'm planning to:
- Move the code over to macOS.
- Debug everything and make sure it runs smoothly on iOS.
- Fine-tune the app so it works great on both iOS and Android.

Let me know if you have any questions or feedback!
