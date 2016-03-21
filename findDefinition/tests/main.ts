import { VariableFinder } from "../variableFinder";


var finder = new VariableFinder();

finder.findDefinitionInFile( "../test.cm", "y" );