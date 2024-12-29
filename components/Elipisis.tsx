export const Ellipsis2 = () => (
  <div
    className="absolute top-1/2 left-1/2 w-[300px] h-[780px] rounded-full opacity-70 blur-[50px] fill-zinc-100 animate-ellipse"
    style={{
      background:
        'linear-gradient(180deg, rgba(48, 240, 170, 0.50) 62%, rgba(153, 252, 124, 0.15) 100%)',
      transform: 'translate(-50%, -50%)',
    }}
  />
)

export const Ellipsis3 = () => (
  <div
    className="absolute top-1/2 left-1/2 w-[220px] h-[220px] rounded-full opacity-70 blur-[50px] -z-10 animate-ellipse-delayed"
    style={{
      background:
        'linear-gradient(305deg, rgba(240.71, 125.14, 250.76, 0.21) 23%, rgba(60.30, 9.54, 143.11, 0.42) 100%)',
      transform: 'translate(-50%, -50%)',
    }}
  />
)
