export type fnType<Return = void> = () => Return;

export interface IBaseDefinition {
  skip?: boolean;
  only?: boolean;
}

export interface IWithName {
  name: string;
}
