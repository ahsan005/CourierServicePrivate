export class User{
  public constructor(init?: Partial<User>) {
    Object.assign(this, init);
}
  public Email: string;
  public Password: string;

}
