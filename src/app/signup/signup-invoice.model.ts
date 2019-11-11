export class SignupInvoice {
  private username: string;
  private email: string;
  private password: string;
  private readonly role = 'USER';

  constructor(username: string, email: string, password: string) {
    this.username = username;
    this.email = email;
    this.password = password;
  }
}
