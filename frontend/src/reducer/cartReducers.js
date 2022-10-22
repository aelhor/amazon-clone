import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

// export const cartReducer = (state = { cartItems: [] }, action) => {
//     switch (action.type) {
//         case CART_ADD_ITEM:
//             // add item to redux store cart 
//             const item = action.payload
//             const existItem = state.cartItems.find((x) => x.product == item.product);
//             if (existItem) {
//                 // replace the old item by the new one
//                 return {
//                     ...state,
//                     cartItems: state.cartItems.map(x => x.product == existItem.product ? item : x)
//                 }
//             }
//             else {
//                 // add the new item to the cart
//                 return {
//                     ...state,
//                     cartItems: state.cartItems.map(x => x.product == existItem.product ? item : x)
//                 }
//             }
//         default:
//             return state;
//     }
// };



export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
      case CART_ADD_ITEM:
        const item = action.payload;
        const existItem = state.cartItems.find((x) => x.product === item.product);
        if (existItem) {
          return {
            ...state,
            cartItems: state.cartItems.map((x) =>
              x.product === existItem.product ? item : x
            ),
          };
        } else {
          return { ...state, cartItems: [...state.cartItems, item] };
        }
      case CART_REMOVE_ITEM:
        return {
          ...state,
          cartItems: state.cartItems.filter((x) => x.product !== action.payload),
        };
      default:
        return state;
    }
  };