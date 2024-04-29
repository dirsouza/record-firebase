import { initializeApp, cert, ServiceAccount, App } from 'firebase-admin/app';
import { Firestore, getFirestore } from 'firebase-admin/firestore';
import * as serviceAccount from './opencircle-firebase.json';

export class FirebaseConfig {
  private readonly app: App;

  constructor() {
    this.app = initializeApp({
      credential: cert(serviceAccount as unknown as ServiceAccount)
    });
  }

  get firestore(): Firestore {
    return getFirestore(this.app);
  }
}
