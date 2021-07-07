import { colors } from "@material-ui/core";
import MenuBookRoundedIcon from "@material-ui/icons/MenuBookRounded";
import TranslateRoundedIcon from "@material-ui/icons/TranslateRounded";
import ListRoundedIcon from "@material-ui/icons/ListRounded";
import EmojiObjectsRoundedIcon from "@material-ui/icons/EmojiObjectsRounded";

interface DecorationSpec {
    color: string;
    avatarIcon: JSX.Element;
    title: string;
}

/* Decorations for cards */

const decorations: Record<string, DecorationSpec> = {
    page: { color: colors.red[600], avatarIcon: <MenuBookRoundedIcon />, title: "Pages" },
    entry: { color: colors.blue[600], avatarIcon: <ListRoundedIcon />, title: "Entries" },
    sense: { color: colors.green[600], avatarIcon: <EmojiObjectsRoundedIcon />, title: "Lexical Senses" },
    translation: { color: colors.yellow[600], avatarIcon: <TranslateRoundedIcon />, title: "Translations" }
};

export { DecorationSpec, decorations };
