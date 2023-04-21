import "@/styles/globals.css"

const Loading = ({}) => {
  return (
    <div className=" mx-auto container flex flex-col-reverse gap-6 h-screen items-center justify-center">
      <div>
        <div className="text-loader ">
          <p>Loading </p>
          <div className="words ">
            <span className="word">Buttons</span>
            <span className="word">Forms</span>
            <span className="word">Switches</span>
            <span className="word">Cards</span>
            <span className="word">Buttons</span>
          </div>
        </div>
      </div>
      <div className="flex gap-6 dark:bg-light-gold ">
        <div className="loader">
          <svg viewBox="0 0 80 80">
            <circle id="test" cx={40} cy={40} r={32} />
          </svg>
        </div>
        <div className="loader triangle">
          <svg viewBox="0 0 86 80">
            <polygon points="43 8 79 72 7 72" />
          </svg>
        </div>
        <div className="loader">
          <svg viewBox="0 0 80 80">
            <rect x={8} y={8} width={64} height={64} />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default Loading
