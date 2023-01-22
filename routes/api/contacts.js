const express = require("express");
const router = express.Router();

const {
  auth,
  validation,
  ctrlWrapper,
  isValidId,
} = require("../../middlewares");
const { schemas } = require("../../models/contact");
const { contacts: ctrl } = require("../../controllers");

router.get("/", auth, ctrlWrapper(ctrl.getAllContacts));

router.get("/:contactId", auth, isValidId, ctrlWrapper(ctrl.getContactById));

router.post(
  "/",
  auth,
  validation(schemas.addContactSchema),
  ctrlWrapper(ctrl.addContact)
);

router.delete("/:contactId", auth, isValidId, ctrlWrapper(ctrl.deleteContactById));

router.put(
  "/:contactId",
   auth,
  isValidId,
  validation(schemas.addContactSchema),
  ctrlWrapper(ctrl.updateContactById)
);

router.patch(
  "/:contactId/favorite",
  auth, 
  isValidId,
  validation(schemas.updateFavoriteSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);

module.exports = router;
