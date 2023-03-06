import {
  BaseREPL,
  BaseREPLContext,
  CommandREPL,
  CommandREPLContext,
} from "./repl.js";
import TidalREPL from "./repl/tidal.js";
import SclangREPL, { RemoteSclangREPL } from "./repl/sclang.js";
import FoxDotREPL from "./repl/foxdot.js";
import MercuryREPL from "./repl/mercury.js";
import SardineREPL from "./repl/sardine.js";

const path = require("path");
const fs = require("fs");

const replClasses = {
  default: CommandREPL,
  tidal: TidalREPL,
  sclang: SclangREPL,
  remote_sclang: RemoteSclangREPL,
  foxdot: FoxDotREPL,
  mercury: MercuryREPL,
  sardine: SardineREPL,
};

function createREPLFor(repl: string, ctx: CommandREPLContext) {
  if (replClasses[repl]) {
    return new replClasses[repl](ctx);
  }

  const replClass = replClasses.default;
  return new replClass({ ...ctx, command: repl });
}

function readPackageMetadata() {
  const packageJsonPath = path.resolve(
    __dirname,
    path.join("..", "package.json")
  );
  const body = JSON.parse(fs.readFileSync(packageJsonPath));
  return body["flok"];
}

export {
  replClasses,
  createREPLFor,
  readPackageMetadata,
  BaseREPL,
  BaseREPLContext,
  CommandREPL,
  CommandREPLContext,
};
