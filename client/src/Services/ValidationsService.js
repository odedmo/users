const validateId = (val) => {
  return /^\d+$/.test(val);
}

const validateFirstName = (val) => {
  return /^[a-zA-Z]+$/.test(val) && val.length <= 120;
}

export default {
  validateId,
  validateFirstName
};