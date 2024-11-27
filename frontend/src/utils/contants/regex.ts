const REGEX = {
  EMA: new RegExp(/^[0-9]{8}$/),
  phone: new RegExp(/^0\d{9}$/),
  email: new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/),
};

export default REGEX;
