class User {
  uid: string;
  email: string;
  displayName: string;
  bio: string;
  photoURL: string;
  emailVerified: boolean;
  phoneNumber: string;
  prompts: string[];
  socials: string[];
  prefs: string[];

  constructor(
    uid: string,
    email: string,
    displayName: string,
    bio: string,
    photoURL: string,
    emailVerified: boolean,
    phoneNumber: string,
    prompts: string[],
    socials: string[],
    prefs: string[]
  ) {
    this.uid = uid;
    this.email = email;
    this.displayName = displayName;
    this.bio = bio;
    this.photoURL = photoURL;
    this.emailVerified = emailVerified;
    this.phoneNumber = phoneNumber;
    this.prompts = prompts;
    this.socials = socials;
    this.prefs = prefs;
  }

  static fromFirebaseDoc(doc: any) {
    return new User(
      doc.uid,
      doc.email,
      doc.displayName,
      doc.bio,
      doc.photoURL,
      doc.emailVerified,
      doc.phoneNumber,
      doc.prompts,
      doc.socials,
      doc.prefs
    );
  }

  static fromFirebaseDocWithId(doc: any) {
    return { id: doc.id, ...this.fromFirebaseDoc(doc) };
  }

  static fromFirebaseSnapshot(snapshot: any) {
    return snapshot.docs.map((doc: any) => this.fromFirebaseDocWithId(doc));
  }

  static fromFirebaseQuerySnapshot(snapshot: any) {
    return snapshot.docs.map((doc: any) => this.fromFirebaseDoc(doc));
  }

  static toSerializable(user: User) {
    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      bio: user.bio,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      phoneNumber: user.phoneNumber,
      prompts: user.prompts,
      socials: user.socials,
      prefs: user.prefs,
    };
  }

  static toFirestore(user: User) {
    return this.toSerializable(user);
  }

  static fromFirestore(snapshot: any) {
    const data = snapshot.data();
    return new User(
      data.uid,
      data.email,
      data.displayName,
      data.bio,
      data.photoURL,
      data.emailVerified,
      data.phoneNumber,
      data.prompts,
      data.socials,
      data.prefs
    );
  }
}

export default User;
