import { FunctionalComponent, h } from 'preact'
import { route } from 'preact-router'
import { useEffect, useRef, useState } from 'preact/hooks'
import { Button, Content, Input, Logo } from '../components'
import { useNavigation, useRange, useSoftkey } from '../hooks'
import xiaoyuzhouFmApi from '../services/api'
import { AuthError } from '../types/api.type'

const Auth: FunctionalComponent = () => {
    const resendCodeTimeout = 3

    const containerRef = useRef<HTMLDivElement>(null)
    const formRef = useRef<HTMLDivElement>(null)
    const buttonRef = useRef<HTMLButtonElement>(null)
    const [mobilePhone, setMobilePhone] = useState('17601270092')
    const [codeSent, setCodeSent] = useState(false)
    const [resendCount, setResendCount] = useState(resendCodeTimeout)
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
        if (error.code && currentStep === 1) {
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
        if (!codeSent) {
            await xiaoyuzhouFmApi.sendCode(mobilePhone)
            setCodeSent(true)
            nextAuth()
        }
    }

    const onSendCode = () => {
        const { uid } = getCurrent()
        if (uid === 'send-code') void handleSendCode()
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
        if (uid === 'verify-code') void handleVerifyCode()
    }

    // Params depending on the current step
    const stepConfig = [
        {
            input: {
                label: 'Mobile',
                name: 'mobilePhone',
                placeholder: 'Mobile Phone...',
                value: mobilePhone,
                handleInput: handleMobileInput,
            },
            button: {
                containerRef: buttonRef,
                text: codeSent
                    ? `Wait for ${JSON.stringify(resendCount)}...`
                    : 'Get verify code',
                handleClick: handleSendCode,
                uid: 'send-code',
            },
        },
        {
            input: {
                label: 'Verify Code',
                name: 'verifyCode',
                placeholder: 'Verify Code...',
                value: verifyCode,
                handleInput: handleVerifyInput,
            },
            button: {
                containerRef: undefined,
                text: 'Login',
                handleClick: handleVerifyCode,
                uid: 'verify-code',
            },
        },
    ]

    // Softkey depending on the current step
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
        if (currentStep === 0) {
            let counter: NodeJS.Timeout
            let timer: NodeJS.Timeout
            if (codeSent) {
                buttonRef.current.setAttribute('disabled', 'disabled')
                counter = setInterval(() => {
                    setResendCount(resendCount => resendCount - 1)
                }, 1000)
                timer = setTimeout(() => {
                    // Reset everything
                    buttonRef.current.removeAttribute('disabled')
                    clearInterval(counter)

                    setResendCount(resendCodeTimeout)
                    setCodeSent(false)
                }, resendCodeTimeout * 1000)
            }
            return () => {
                clearInterval(counter)
                clearTimeout(timer)
            }
        }
    }, [currentStep])

    useEffect(() => setNavigation(0), [currentStep])

    return (
        <Content containerRef={containerRef}>
            <header class="text-center">
                <Logo size={60} />
                <h1 class="text-xl">22PM</h1>
                <h4 class="text-bold text-gray-500">小宇宙 on KaiOS</h4>
            </header>
            <main ref={formRef}>
                <Input
                    label={stepConfig[currentStep].input.label}
                    name={stepConfig[currentStep].input.name}
                    placeholder={stepConfig[currentStep].input.placeholder}
                    value={stepConfig[currentStep].input.value}
                    handleInput={stepConfig[currentStep].input.handleInput}
                />
                <Button
                    containerRef={stepConfig[currentStep].button.containerRef}
                    text={stepConfig[currentStep].button.text}
                    handleClick={stepConfig[currentStep].button.handleClick}
                    uid={stepConfig[currentStep].button.uid}
                />
                {errorMessage()}
            </main>
        </Content>
    )
}

export default Auth
