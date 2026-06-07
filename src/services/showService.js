import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";

// Tên collection trong Firestore
const collectionName = "shows";

// 1. LẤY DANH SÁCH SHOWS
export const getShows = async () => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  const shows = [];
  querySnapshot.forEach((doc) => {
    // Ép thêm ID của Firestore vào data trả về để dễ thao tác sau này
    shows.push({ id: doc.id, ...doc.data() }); 
  });
  return shows;
};

// 2. THÊM SHOW MỚI
export const addShow = async (showData) => {
  const docRef = await addDoc(collection(db, collectionName), showData);
  return docRef.id;
};

// 3. CẬP NHẬT SHOW CÓ SẴN
export const updateShow = async (id, updatedData) => {
  const showRef = doc(db, collectionName, id);
  await updateDoc(showRef, updatedData);
};

// 4. XÓA SHOW
export const deleteShow = async (id) => {
  const showRef = doc(db, collectionName, id);
  await deleteDoc(showRef);
};
