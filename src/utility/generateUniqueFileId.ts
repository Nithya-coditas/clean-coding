import { v4 as uuidv4 } from 'uuid';
// unique identifier generated for a particular file by combining filename and a randomid
export const generateUniqueFileId = (fileName: string) => {
  const randomId = uuidv4();
  return randomId + fileName;
};
