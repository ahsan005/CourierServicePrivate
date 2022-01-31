export class ProfileType {
  public constructor(init?: Partial<ProfileType>) {
    Object.assign(this, init);
  }

  public ProfileTypeId: number;
  public ProfileTypeName: string;
  public Prefix: string;
}
