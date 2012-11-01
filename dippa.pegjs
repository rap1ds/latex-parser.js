start
  = Document

{ console.log("Document") }
Document
  = SourceElements

{ console.log("SourceElements") }
SourceElements
  = (LineComment)*

{ console.log("SourceCharacter") }
SourceCharacter
  = char:.
  
{ console.log("LineComment") }
LineComment
  = "%" (!LineTerminator SourceCharacter)*

{ console.log("LineTerminator") }
LineTerminator
  = "\n"