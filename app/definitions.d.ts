interface INavigationProps {
  navigation?: {
    getParam: (paramName: string, defaultValue?: any) => any;
    navigate: (routeName: string, params?: any) => void;
  };
  route?: {
    params: any;
  };
}
