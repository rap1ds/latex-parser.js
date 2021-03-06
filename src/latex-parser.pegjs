start
  = __ document:Document __ { return document; }

Document
  = elements:SourceElements? {
      return {
        type:     "Document",
        elements: elements !== "" ? elements : []
      };
    }

SourceElements
  = head:SourceElement tail:(__ SourceElement)* {
      var result = [head];
      for (var i = 0; i < tail.length; i++) {
        result.push(tail[i][1]);
      }
      return result;
    }

SourceElement
  = command:Command { return {command : command} }
  / math:MathBlock { return {math : math} }
  / text:TextBlock { return {text : text} }
  
SourceCharacter
  = char:.
  
TextBlock
  = TextCharacters
  
TextCharacters
  = chars:TextCharacter+ { 
    return {
      content: chars.join(""),
      line: line,
      column: column
    }
  }

TextCharacter
  = !("\\" / "%" / "\\]" / "\$") char_:SourceCharacter { return char_; }
  / "\\LaTeX\\"
  / "\\\\"
  / "\\" sequence:EscapedCharacter
  / ForceHyphenation
  / ForceSpace

EscapedCharacter
  = ("\{" / "\}" / "\%" / "\$" / "\@" / "\&" / "\#" / "\"")
  
SingleLineComment
  = "%" (!LineTerminator SourceCharacter)*
    
LineTerminator
  = "\n"
  
Comment "comment"
  = SingleLineComment
  
ForceHyphenation
  = "\\\-"
  
ForceSpace
  = "\\ "
  / "\\" LineTerminatorSequence
  
Command
  = "\\" cname:CommandName "*"? args:CommandArgument* { 
      return {
        name: cname, 
        args: args.join(""),
        line: line,
        column: column
      }
    }

MathBlock
  = "\\[" mathChars:MultiLineMathCharacters? "\\]" { return mathChars }
  / "\$" mathChars:SingleLineMathCharacters? "\$" { return mathChars }

SingleLineMathCharacters
  = chars:SingleLineMathCharacter+ { return chars.join(""); }

MultiLineMathCharacter
  = !("\\]") char_:SourceCharacter { return char_; }

MultiLineMathCharacters
  = chars:MultiLineMathCharacter+ { return chars.join(""); }

SingleLineMathCharacter
  = !("\$") char_:SourceCharacter {return char_; }

CommandArgument
  = __ "\[" squareArg:SquareCharacters? "\]" { return "[" + squareArg + "]" }
  / __ "\{" curlyArg:CurlyCharacters? "\}" { return "{" + curlyArg + "}" }
  
CurlyBlock
  = "\{" CurlyCharacters? "\}"
  
SquareCharacters
  = chars:SquareCharacter+ { return chars.join(""); }
  
SquareCharacter
  = !("\]") char_:SourceCharacter { return char_; }
CurlyCharacters
  = chars:CurlyCharacter+ { return chars.join(""); }
  
CurlyCharacter
  = !("\{" / "\}") char_:SourceCharacter { return char_; }
  / CurlyBlock
  
CommandName
  = cname:[a-zA-Z]+ { return cname.join(""); }
  
/* Whitespace */

_
  = (WhiteSpace / SingleLineComment)*

__
  = (WhiteSpace / LineTerminatorSequence / Comment)*
  
WhiteSpace "whitespace"
  = [\t\v\f \u00A0\uFEFF]
  / Zs
  
// Separator, Space
Zs = [\u0020\u00A0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000]

LineTerminatorSequence "end of line"
  = "\n"
  / "\r\n"
  / "\r"
  / "\u2028" // line separator
  / "\u2029" // paragraph separator
