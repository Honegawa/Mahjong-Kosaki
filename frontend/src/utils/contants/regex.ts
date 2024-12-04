const REGEX = {
  EMA: new RegExp(/^[0-9]{8}$/),
  phone: new RegExp(/^0\d{9}$/),
  email: new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/),
  password: new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
  ),
  postalCode: new RegExp(/^\d{5}$/),
};

export default REGEX;
