import { CSSProperties, memo, MouseEvent, useEffect, useMemo, useRef, useState } from 'react'

/**
 * Best Of Switch Button for Your Word
 */
export const Switch = memo(
  <T extends string | boolean | number>({
    onChange,
    valueOfBox,
    defaultValue,
    buttonsClassName,
    buttonsStyle,
    containerClassName,
    containerStyle,
    toggleElementClassName,
    toggleElementStyle,
  }: {
    /**
     * This is a Function for Listen to Change value
     * @param newValue string of new value changed
     * @param event this paramet can get you target click and other about MouseEvent
     */
    onChange: ({
      newValue,
      prevValue,
      event,
    }: {
      /**
       * New Value
       */
      newValue: T
      /**
       * Last Value
       */
      prevValue: T
      /**
       * Event
       * this paramet can get you target click
       * and other about MouseEvent
       */
      event: MouseEvent
    }) => void
    /**
     * Array of Your Item Information
     *
     * Exp: [
     *
     *        {
     *           title: "active" as string,
     *           value: true as string | boolean | number,
     *           color?: "blue" | "hexColor" as string if your need
     *        },
     *
     *        {
     *           title: "deactive" as string,
     *           value: false as string | boolean | number,
     *           color?: "red" | "hexColor" as string if your need
     *        }
     *
     *     ]
     */
    valueOfBox: {
      title: string
      value: T
      color?: string
    }[]
    /**
     * default value of when load
     * exp true
     * type of === value in valueOfBox  =>  string | boolean | number
     */
    defaultValue?: T
    /**
     * tailwindCss Class for styling to Container
     * Some Property Need !Important
     */
    containerClassName?: string
    /**
     * tailwindCss Class for styling to Buttons
     * Some Property Need !Important
     */
    buttonsClassName?: string
    /**
     * tailwindCss Class for styling to ToggleElement
     * Some Property Need !Important
     */
    toggleElementClassName?: string
    /**
     * CSS in JS for styling to Container
     * Some Property Need !Important
     */
    containerStyle?: CSSProperties
    /**
     * CSS in JS for styling to Buttons
     * Some Property Need !Important
     */
    buttonsStyle?: CSSProperties
    /**
     * CSS in JS for styling to ToggleElement
     * Some Property Need !Important
     */
    toggleElementStyle?: CSSProperties
  }) => {
    const activeFilter = useRef<HTMLDivElement>(null)
    const [statusState, setStatus] = useState<number>(0)
    const [lastStatusState, setLastStatus] = useState<number>(statusState)
    const btnsRef = useRef<HTMLButtonElement[]>([])
    const [mounted, mount] = useState(false)
    const blueBlockWidth = useMemo(() => {
      return btnsRef.current[statusState]?.offsetWidth
    }, [mounted, btnsRef.current, statusState, localStorage.rtlClass])

    const mainColor = useMemo(
      () => valueOfBox[statusState].color || '#4361ee',
      [valueOfBox, statusState],
    )
    const transX = useMemo(() => {
      let sumOfTransX = 1
      for (let i = 0; i < statusState; i++) {
        sumOfTransX += btnsRef.current[i].offsetWidth as number
      }

      return sumOfTransX + 3
    }, [statusState, activeFilter.current, localStorage.rtlClass])

    useEffect(() => {
      if (!mounted) mount(true)
      if (defaultValue) {
        setStatus(valueOfBox.findIndex((item) => item.value === defaultValue))
        setLastStatus(valueOfBox.findIndex((item) => item.value === defaultValue))
      }
    }, [defaultValue])

    return (
      <div
        ref={activeFilter}
        onClick={(e) => {
          onChange({
            newValue: valueOfBox[statusState].value,
            prevValue: valueOfBox[lastStatusState].value,
            event: e,
          })
          setLastStatus(statusState)
        }}
        style={{ ...containerStyle, borderColor: mainColor }}
        className={
          (containerClassName || '') +
          ' flex h-[42px] w-fit shadow-md px-1 relative border rounded-xl'
        }
      >
        {valueOfBox.map((item, index) => (
          <button
            type="button"
            key={index}
            onClickCapture={() => {
              setStatus(index)
            }}
            style={buttonsStyle}
            ref={(el) => (btnsRef.current[index] = el as HTMLButtonElement)}
            id={item.value + 'Btn'}
            className={
              (buttonsClassName || '') +
              ` ${statusState === index && ' !text-white duration-1000'} z-10 px-1 transition-colors duration-500`
            }
          >
            {item.title}
          </button>
        ))}
        <div
          style={{
            ...toggleElementStyle,
            width: blueBlockWidth,
            insetInlineStart: transX,
            backgroundColor: mainColor,
          }}
          className={
            (toggleElementClassName || '') +
            ' !absolute w-14 !transition-all duration-500 top-1 bottom-1 rounded-xl'
          }
        />
      </div>
    )
  },
)
