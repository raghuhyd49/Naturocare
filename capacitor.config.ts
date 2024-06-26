import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.naturocare.app',
  appName: 'NaturoCare',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
