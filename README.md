#JSON Edit
A minimalistic JSON Editor.

#Setup
Copy the repo into a public accessible directory (marked as `{$PATH}` in the
code below). And include the following files:
```html
<!-- if you already include query you can skip this include -->
<script src="{$PATH}/libs/jQuery_v1.11.1.js"></script>

<!-- include interfaces -->
<script src="{$PATH}/src/interfaces/Interface.js"></script>
<script src="{$PATH}/src/interfaces/IEventHandler.js"></script>
<script src="{$PATH}/src/interfaces/IEditor.js"></script>

<!-- include code -->
<script src="{$PATH}/src/EventHandler.js"></script>
<script src="{$PATH}/src/JSONNullEditor.js"></script>
<script src="{$PATH}/src/JSONNumberEditor.js"></script>
<script src="{$PATH}/src/JSONObjectEditor.js"></script>
<script src="{$PATH}/src/JSONArrayEditor.js"></script>
<script src="{$PATH}/src/SimpleStringEditor.js"></script>
<script src="{$PATH}/src/jsonEditor.js"></script>

<link rel="stylesheet" type="text/css" href="{$PATH}/resources/css/jsonEditor.css">
```

#Usage
Every Editor included, implements the IEditor interface and therefore can be
used on its own to edit their specific JSON type.

The ``JSONDynamicNode``-Editor dynamically chooses the right Editor for the JSON
value given. Be carefull when passing arbitratry objects (especially if not
parsed from JSON and make sure to only pass objects with non circular
references. No check for circlular references is done and therefore the
application will loop infinitely if such an object is passed as a parameter.

For plain JSON strings the ``JSONEditor`` can be used. It parses the JSON string
and displays it in a `JSONDynamicNode`` (for non valid JSON string a fallback
to text mode is done).

#License
The MIT License (MIT)

Copyright (c) 2015 Moritz Willig

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
