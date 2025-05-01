import IcRoundDeleteForever from "~icons/ic/round-delete-forever";
import MaterialSymbolsAddRounded from "~icons/material-symbols/add-rounded";
import TablerPencil from "~icons/tabler/pencil";
import MdiContentSavePlus from "~icons/mdi/content-save-plus";
import MaterialSymbolsUndoRounded from "~icons/material-symbols/undo-rounded";
import MaterialSymbolsLightStylusNote from "~icons/material-symbols-light/stylus-note";
import MaterialSymbolsPersonRounded from "~icons/material-symbols/person-rounded";

export const icons = {
  "filled-delete": IcRoundDeleteForever,
  "add-circle-icon": MaterialSymbolsAddRounded,
  edit: TablerPencil,
  save: MdiContentSavePlus,
  undo: MaterialSymbolsUndoRounded,
  open_note_modal: MaterialSymbolsLightStylusNote,
  user: MaterialSymbolsPersonRounded,
};

export type IconName = keyof typeof icons;
