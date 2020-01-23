import {createStackNavigator} from 'react-navigation';
import {
  Landing,
  Filter,
  Reviews,
  SingleCard,
  Bag,
  CheckOut,
  Success,
} from './screens';
import {Zoom} from './components';

const RootStack = createStackNavigator(
  {
    _Landing: Landing,
    _Filter: Filter,
    _Reviews: Reviews,
    _SingleCard: SingleCard,
    _Zoom: Zoom,
    _Bag: Bag,
    _CheckOut: CheckOut,
    _Success: Success,
  },
  {
    initialRouteName: '_Landing',
    navigationOptions: {
      header: null,
    },
  },
);

export default RootStack;
