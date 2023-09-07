## 盖章动画
```css
.stamp {
    border: 0.1em solid red;
    border-radius: 0.2em;
    color: red;
    font-size: 40px;
    font-weight: 700;
    line-height: 1;
    padding: 0.1em 0.5em;
    margin: 0 auto;
    position: absolute;
    top: 350px;
    left: 40%;
    z-index: 10;
    text-transform: uppercase;
    -webkit-transform: rotate(-25deg) scale(1);
    transform: rotate(-25deg) scale(1);
    transition: all .5s cubic-bezier(.6,.04,.98,.335);
    -webkit-animation: stamp 200ms;
    animation: stamp 300ms;
    animation-delay: 600ms;
    -webkit-animation-delay: 600ms;
    animation-fill-mode: forwards;
    opacity: 0;
}

@keyframes stamp
0% {
    -webkit-transform: rotate(-4deg) scale(2.8);
    transform: rotate(-4deg) scale(2.8);
    opacity: 0.4;
}

15% {
    -webkit-transform: rotate(-8deg) scale(2.2);
    transform: rotate(-8deg) scale(2.2);
    opacity: 0.5;
}
25% {
    -webkit-transform: rotate(-12deg) scale(1.8);
    transform: rotate(-12deg) scale(1.8);
    opacity: 0.6;
}
45% {
    -webkit-transform: rotate(-16deg) scale(1.4);
    transform: rotate(-16deg) scale(1.4);
    opacity: 0.7;
}
100% {
    -webkit-transform: rotate(-20deg) scale(1);
    transform: rotate(-20deg) scale(1);
    opacity: 0.8;
}
```
