A simple JS pagination plugin
-----------------------------

#### Dependencies
- jQuery

#### Usage
``` html
      <div class="parent">
        <div class="item">item1</div>
        <div class="item">item2</div>
        ...
        <div class="item">item50</div>
      </div>
      <ul class="pagination"></ul>
    </div>
    <script src="../jquery.min.js"></script>
    <script src="../pagination.js"></script>
    <script>
      pagination.init('.parent', '.item', '.pagination', false, 4);
    </script>
```