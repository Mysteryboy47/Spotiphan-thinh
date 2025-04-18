import { Router } from "express";
import {
  archiveAlbum,
  createAlbum,
  getMyAlbums,
  removeSongFromAlbum,
  updateAlbum,
} from "../controller/album.controller.js";
import {
  createSong,
  deleteSong,
  getSinglesByArtist,
  getSongsByArtist,
  toggleArchiveSong,
  updateSong,
} from "../controller/song.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import {
  requireArtist,
  requireArtistOrAdmin,
} from "../middleware/authorization.middleware.js";

const router = Router();
router.use(authenticate);

// **Quản lý Album (chỉ dành cho Artist)**
router.get("/my-albums", requireArtist, getMyAlbums);
router.post("/albums", requireArtist, createAlbum);
router.put(
  "/albums/:albumId/remove-song/:songId",
  requireArtist,
  removeSongFromAlbum
);
router.put("/albums/:albumId/archive", requireArtistOrAdmin, archiveAlbum);
router.put("/albums/:albumId", requireArtist, updateAlbum);

// **Quản lý bài hát (chỉ dành cho Artist)**
router.get("/singles/:artistId", getSinglesByArtist);
router.get("/songs/:artistId", getSongsByArtist);
router.post("/songs", requireArtist, createSong);
router.delete("/songs/:songId", requireArtist, deleteSong);
router.patch(
  "/songs/:songId/toggle-archive",
  requireArtistOrAdmin,
  toggleArchiveSong
);
router.put("/songs/:songId", requireArtist, updateSong);

export default router;
