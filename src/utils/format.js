export const formatLocalDateTime = (value) =>{
    const date = new Date(value);
   return date.toISOString().replace("Z", "");
}