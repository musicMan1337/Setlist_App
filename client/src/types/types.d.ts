declare namespace Types {
  type LoginSuccess = (user_name: string) => void;

  type DeleteFunc = (
    table: Constants.SONGS[0] | Constants.SETS[0] | Constants.GIGS[0] | Constants.SONGS_SETS_LINK,
    itemId: number,
    linkId?: number
  ) => Promise<void>;

  type SubmitFunc = (
    e: React.BaseSyntheticEvent,
    id: number
  ) => Promise<void>;

  // ComponentProps
  type DatabaseContextProviderProps = {
    userName: string;
  };

  type HeaderProps = {
    userName: string;
    logout(): void;
  };

  type PrivateRouteProps = {
    component: React.FC<any>;
    path: string;
    exact?: boolean;
  };

  type PublicRouteProps = {
    component: React.FC<any>;
    loginSuccess: LoginSuccess;
    path: string;
  };

  type LoginPageProps = {
    loginSuccess: LoginSuccess;
  };

  type LoginFormProps = {
    loginSuccess: LoginSuccess;
  };

  type MobileViewProps = {
    page: Constants.SONGS | Constants.SETS | Constants.GIGS;
  };

  type MobileCardProps = {
    id: number;
    title: string;
    description: string;
    handleUserUpdate(): void;
    isSong?: boolean;
    composer?: string;
    arranger?: string;
    isSet?: boolean;
    songs?: Context.Song[];
    allSongs?: Context.Song[];
  };

  type SetGigViewProps = {
    page: Constants.SETS | Constants.GIGS;
  };

  type SGComponentsProps = {
    songsList?: Context.Song[];
    setsList?: Context.Set[];
    setsBoard?: Context.Set[];
    gigsBoard?: Context.Gig[];
    buttonText: 'Add to Set' | 'Add to Gig';
    handleUserUpdate(): void;
  };

  type ButtonProps = Partial<{
    type: 'button' | 'submit';
    className: string;
    value: string;
    onClick: React.MouseEventHandler;
    onChange: React.MouseEventHandler;
    disabled: boolean;
  }>;
}
