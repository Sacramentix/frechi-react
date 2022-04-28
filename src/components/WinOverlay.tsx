{/* <template>
    <div class="win-overlay">
        <section>
            <h2>✨ Bien joué vous avez gagné! ✨</h2>
            <button @click="reset()">Rejouer</button>
        </section>
    </div>
</template>
<style lang="scss">
.win-overlay {
    position: fixed;
    inset: 0;
    background: #0003;
    display: grid;
    place-items: center;
    section {
        background: #222;
        color: #ccc;
        padding: 25px;
        border-radius: 15px;
        display: grid;
        place-items: center;
        gap: 25px;

    }
    button {
        border: none;
        border-radius: 15px;
        padding: 15px;
        background: #ccc;
        color: #000;
    }
}
</style>
<script lang="ts" setup>
import { reset } from '../store/game/actions';
</script> */}
import { useContext, } from 'react'
import { AppContext, AppContextType } from '../store/game';
import './WinOverlay.scss'

function WinOverlay() {

  const context = useContext(AppContext) as AppContextType;
  
  const { reset } = context.actions;

  return (
    <div className="win-overlay">
      <section>
        <h2>✨ Bien joué vous avez gagné! ✨</h2>
        <button onClick={()=>reset(context)}>Rejouer</button>
      </section>
    </div>
  )
}

export default WinOverlay;