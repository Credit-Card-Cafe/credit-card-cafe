<script lang="js">
      export let bank;
  </script>
  
  
  <div id="bank">
      <a href="/bank/{bank.id}">
        <div id="bankCard">{bank.name}</div>
      </a>
  </div>
  
  
  
  <style>
      #bank {
        display: flex;
        flex-direction: column;
        align-items: center;
          -webkit-transform:scale(0.9);
          -moz-transform:scale(0.9);
          -ms-transform:scale(0.9);
          transform:scale(0.9);
      }
      #bankCard {
          position: relative;
          background: rgb(253,248,244);
          width: 323px;
          height: 185px;
          padding: 25px;
          border: 1px solid black;
          border-radius: 18px;
          display: flex;
          flex-direction: column;
          align-items: center;
      }
      @media (min-width: 768px) {
          #bank {
            -webkit-transform:scale(1);
            -moz-transform:scale(1);
            -ms-transform:scale(1);
            transform:scale(1);
          }
      }
      
  </style>
  
  