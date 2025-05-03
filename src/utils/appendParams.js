export const addParamIfExists = (params,key, value) => {
  if(value) {
    params.append(key, value);
  }
  return params;
};