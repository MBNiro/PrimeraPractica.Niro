import MessagesDaoMongoDB from "../daos/mongodb/messages.dao.js";
const MsgDao = new MessagesDaoMongoDB();

export const getAllService = async () => {
  try {
    const docs = await MsgDao.getAllMessages();
    return docs;
  } catch (error) {
    console.log(error);
  }
};

export const getByIdService = async (id) => {
  try {
    const doc = await MsgDao.getMsgById(id);
    if (!doc) throw new Error("Message not found");
    else return doc;
  } catch (error) {
    console.log(error);
  }
};

export const createService = async (obj) => {
  try {
    const newProd = await MsgDao.createMsg(obj);
    if (!newProd) throw new Error("Error");
    else return newProd;
  } catch (error) {
    console.log(error);
  }
};

export const updateService = async (id, obj) => {
  try {
    const doc = await MsgDao.getMsgById(id);
    if (!doc) {
      throw new Error("Message not found");
    } else {
      const msgUpd = await MsgDao.updateMsg(id, obj);
      return msgUpd;
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteService = async (id) => {
  try {
    const msgDel = await MsgDao.deleteMsg(id);
    return msgDel;
  } catch (error) {
    console.log(error);
  }
};