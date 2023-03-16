import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Auth } from '@angular/fire/auth';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class FirebaseModule {

  constructor() {
    const firebaseConfig = {
      apiKey: "AIzaSyCHEqRrEDfGU2EtCTd8Gh4E2sQBbrDbtAo",
      authDomain: "tversus-f87bb.firebaseapp.com",
      projectId: "tversus-f87bb",
      storageBucket: "tversus-f87bb.appspot.com",
      messagingSenderId: "685865760074",
      appId: "1:685865760074:web:e15ae268ff4b085af07db3",
      measurementId: "G-DVQFW1MXK5"
    };
    
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
  }
}
