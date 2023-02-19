export default function utils(error) {
  return error.response && error.response.data.meassage
    ? error.response.data.meassage
    : error.meassage;
}
