import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.lagnamanch.app",
  appName: "LagnaManch",
  webDir: "out",
  server: {
    // Load the live site — keeps all server features (API routes, auth, middleware)
    url: "https://lagnamanch.com",
    cleartext: false,
  },
  android: {
    backgroundColor: "#800020",
    allowMixedContent: false,
    buildOptions: {
      releaseType: "APK",
    },
  },
  plugins: {
    SplashScreen: {
      launchAutoHide: true,
      backgroundColor: "#800020",
      androidSplashResourceName: "splash",
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true,
    },
  },
};

export default config;
