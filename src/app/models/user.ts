export class User{
  public constructor(init?: Partial<User>) {
    Object.assign(this, init);
}
  public UserName: string;
  public Password: string;

}
