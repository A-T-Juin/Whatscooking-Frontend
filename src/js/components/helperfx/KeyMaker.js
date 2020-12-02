import Hashes from 'jshashes';

const MD5 = new Hashes.MD5

const keyMaker = (user, name, pictureType) => {
  let key = user + name + pictureType + ".jpg";
  return MD5.hex(key)
}

export default keyMaker;
