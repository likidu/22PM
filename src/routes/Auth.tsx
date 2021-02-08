import { Fragment, FunctionalComponent, h } from 'preact'
import { useEffect, useRef, useState } from 'preact/hooks'
import { Content } from '../components'
import { useNavigation, useRange, useSoftkey } from '../hooks'

interface AuthProps {
    hello: string
}

const Auth: FunctionalComponent<AuthProps> = ({ hello }: AuthProps) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const formRef = useRef<HTMLDivElement>(null)
    const [mobile, setMobile] = useState('')
    const [verify, setVeify] = useState('')

    const [currentStep, prevAuth, nextAuth] = useRange(0, 1)
    const [, setNavigation, getCurrent] = useNavigation(
        'Auth',
        containerRef,
        formRef,
        'y',
    )

    // Auth step 1, send mobile phone
    const handleMobileInput = (ev: Event) => {
        if (ev.target instanceof HTMLInputElement) {
            const { value } = ev.target
            setMobile(value)
        }
    }

    const handleSendCode = () => {
        console.log('Mobile', mobile)
    }

    const onSendCode = () => {
        const { uid } = getCurrent()
        if (uid === 'send-code') {
            handleSendCode()
            nextAuth()
        }
    }

    // Auth step 2: verify code
    const handleVerifyInput = (ev: Event) => {
        if (ev.target instanceof HTMLInputElement) {
            const { value } = ev.target
            setVeify(value)
        }
    }

    const handleVerifyCode = () => {
        console.log('Verify code', verify)
    }

    const onVerifyCode = () => {
        const { uid } = getCurrent()
        if (uid === 'verify-code') {
            handleVerifyCode()
        }
    }

    const softkeyConfig = [
        { center: 'Select', left: '', onKeyCenter: onSendCode },
        {
            center: 'Select',
            left: 'Back',
            onKeyCenter: onVerifyCode,
            onKeyLeft: prevAuth,
        },
    ]

    useSoftkey('Auth', softkeyConfig[currentStep], [mobile, currentStep])

    useEffect(() => setNavigation(0), [currentStep])

    return (
        <Content containerRef={containerRef}>
            <div ref={formRef}>
                {currentStep === 0 && (
                    <Fragment>
                        <input
                            type="tel"
                            name="mobilePhone"
                            id="mobilePhone"
                            placeholder="Mobile phone"
                            value={mobile}
                            onInput={handleMobileInput}
                            data-selectable
                        />
                        <button
                            type="button"
                            onClick={handleSendCode}
                            data-selectable
                            data-selected-uid="send-code"
                        >
                            Get verification code
                        </button>
                    </Fragment>
                )}
                {currentStep === 1 && (
                    <Fragment>
                        <input
                            type="text"
                            name="verifyCode"
                            id="verifyCode"
                            placeholder="Verify Code"
                            value={verify}
                            onInput={handleVerifyInput}
                            data-selectable
                        />
                        <button
                            type="button"
                            onClick={handleVerifyCode}
                            data-selectable
                            data-selected-uid="verify-code"
                        >
                            Login
                        </button>
                    </Fragment>
                )}
            </div>
        </Content>
    )
}

export default Auth
