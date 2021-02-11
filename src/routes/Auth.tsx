import { Fragment, FunctionalComponent, h } from 'preact'
import { route } from 'preact-router'
import { useEffect, useRef, useState } from 'preact/hooks'
import { Button, Content, Input, List, Logo } from '../components'
import { useNavigation, useRange, useSoftkey } from '../hooks'
import xiaoyuzhouFmApi from '../services/api'
import { AuthError } from '../types/api.type'

const Auth: FunctionalComponent = () => {
    const containerRef = useRef<HTMLDivElement>(null)
    const formRef = useRef<HTMLDivElement>(null)
    const [mobilePhone, setMobilePhone] = useState('17601270092')
    const [verifyCode, setVeifyCode] = useState('')
    const [error, setError] = useState<AuthError>({} as never)

    const [currentStep, prevAuth, nextAuth] = useRange(0, 1)
    const [, setNavigation, getCurrent] = useNavigation(
        'Auth',
        containerRef,
        formRef,
        'y',
    )

    // TODO: use notification to show error message
    const errorMessage = () => {
        if (error.code) {
            return (
                <p class="text-secondary text-red-500 text-center">
                    {error.code}: {error.toast}
                </p>
            )
        }
    }

    // Auth step 1, send mobile phone
    const handleMobileInput = (ev: Event) => {
        if (ev.target instanceof HTMLInputElement) {
            const { value } = ev.target
            setMobilePhone(value)
        }
    }

    const handleSendCode = async () => {
        await xiaoyuzhouFmApi.sendCode(mobilePhone)
    }

    const onSendCode = () => {
        const { uid } = getCurrent()
        if (uid === 'send-code') {
            void handleSendCode()
            nextAuth()
        }
    }

    // Auth step 2: verify code
    const handleVerifyInput = (ev: Event) => {
        if (ev.target instanceof HTMLInputElement) {
            const { value } = ev.target
            setVeifyCode(value)
        }
    }

    const handleVerifyCode = async () => {
        const result = await xiaoyuzhouFmApi.loginWithSMS(
            mobilePhone,
            verifyCode,
        )
        // It means fail...
        if (result && 'success' in result) {
            setError(result)
            return
        }
        route('/', true)
    }

    const onVerifyCode = () => {
        const { uid } = getCurrent()
        if (uid === 'verify-code') {
            void handleVerifyCode()
        }
    }

    const softkeyConfig = [
        { center: 'Select', left: '', onKeyCenter: onSendCode },
        {
            center: 'Select',
            left: 'Back',
            right: ' ',
            onKeyCenter: onVerifyCode,
            onKeyLeft: prevAuth,
            onKeyRight: () => true,
        },
    ]

    useSoftkey('Auth', softkeyConfig[currentStep], [
        mobilePhone,
        verifyCode,
        currentStep,
    ])

    useEffect(() => {
        console.log('handleSendCode triggered')
    }, [handleSendCode])

    useEffect(() => setNavigation(0), [currentStep])

    return (
        <Content containerRef={containerRef}>
            <header class="text-center">
                <Logo size={60} />
                <h1 class="text-xl">22PM</h1>
                <h4 class="text-bold text-gray-500">小宇宙 on KaiOS</h4>
            </header>
            <main ref={formRef}>
                {currentStep === 0 && (
                    <Fragment>
                        <Input
                            label="Mobile"
                            name="mobilePhone"
                            placeholder="Mobile Phone..."
                            value={mobilePhone}
                            handleInput={handleMobileInput}
                        />
                        <Button
                            text="Get verification code"
                            handleClick={handleSendCode}
                            uid="send-code"
                        />
                    </Fragment>
                )}
                {currentStep === 1 && (
                    <Fragment>
                        <Input
                            label="Verify Code"
                            name="verifyCode"
                            placeholder="Verify Code..."
                            value={verifyCode}
                            handleInput={handleVerifyInput}
                        />
                        <Button
                            text="Login"
                            handleClick={handleVerifyCode}
                            uid="verify-code"
                        />
                        {errorMessage()}
                    </Fragment>
                )}
            </main>
        </Content>
    )
}

export default Auth
