document.addEventListener('DOMContentLoaded', () => {
    const installButton = document.getElementById('install-button');
    const mainContainer = document.getElementById('main-container');
    const terminalContainer = document.getElementById('terminal-container');
    const terminalOutput = document.getElementById('terminal-output');
    const buttonsContainer = document.getElementById('buttons-container');
    const glitchScreen = document.getElementById('glitch-screen');
    const bsod = document.getElementById('bsod');
    const fileExplorer = document.getElementById('file-explorer');
    const explorerContent = document.getElementById('explorer-content');
    const closeExplorerButton = document.getElementById('close-explorer');
    const webcamIndicator = document.getElementById('webcam-indicator');
    const systemRestore = document.getElementById('system-restore');
    const restoreProgress = document.getElementById('restore-progress');
    const restoreStatus = document.getElementById('restore-status');
    const passwordPrompt = document.getElementById('password-prompt');
    const adminPasswordInput = document.getElementById('admin-password');
    const submitPasswordButton = document.getElementById('submit-password');
    const passwordError = document.getElementById('password-error');
    const firewallBlock = document.getElementById('firewall-block');
    const firewallOkButton = document.getElementById('firewall-ok');
    const keyboardLock = document.getElementById('keyboard-lock');
    const deletePrompt = document.getElementById('delete-prompt');
    const deleteYesButton = document.getElementById('delete-yes');
    const deleteNoButton = document.getElementById('delete-no');
    const rebootScreen = document.getElementById('reboot-screen');
    const gotcha = document.getElementById('gotcha');
    const creditsScreen = document.getElementById('credits-screen');
    const boingSound = document.getElementById('boing-sound');

    installButton.addEventListener('click', () => {
        document.body.classList.add('flicker');
        setTimeout(() => {
            mainContainer.classList.add('hidden');
            document.body.classList.remove('flicker');
            terminalContainer.classList.remove('hidden');
            startTerminalScan();
        }, 1500);
    });

    function startTerminalScan() {
        const scanMessages = [
            'System integrity check initiated...',
            'Scanning user directories...',
            'C:\\Users\\...\\Documents\\_secret_plans.doc found.',
            'C:\\Users\\...\\Downloads\\funny_memes.zip detected.',
            'C:\\Users\\...\\AppData\\Local\\Temp\\virus_payload.dat uploading...',
            'Initiating file system corruption...',
            'Executing self-destruct sequence...'
        ];

        let i = 0;
        const scanInterval = setInterval(() => {
            if (i < scanMessages.length) {
                terminalOutput.textContent += `\n> ${scanMessages[i]}`;
                terminalOutput.scrollTop = terminalOutput.scrollHeight;
                i++;
            } else {
                clearInterval(scanInterval);
                setTimeout(() => {
                    terminalContainer.classList.add('hidden');
                    showClickMeButtons();
                }, 2000);
            }
        }, 1000);
    }

    function showClickMeButtons() {
        buttonsContainer.classList.remove('hidden');
        const clickMeButtons = document.querySelectorAll('.click-me-button');
        clickMeButtons.forEach(button => {
            button.addEventListener('click', () => {
                buttonsContainer.classList.add('hidden');
                showGlitchScreen();
            });
        });
    }

    function showGlitchScreen() {
        glitchScreen.classList.remove('hidden');

        const glitchInterval = setInterval(() => {
            document.body.style.transform = `translate(${Math.random() * 50 - 25}px, ${Math.random() * 50 - 25}px)`;
            glitchScreen.style.transform = `translate(${Math.random() * 5 - 2.5}px, ${Math.random() * 5 - 2.5}px)`;
        }, 50);

        setTimeout(() => {
            clearInterval(glitchInterval);
            glitchScreen.classList.add('hidden');
            showBSOD();
        }, 3000);
    }

    function showBSOD() {
        bsod.classList.remove('hidden');
        document.addEventListener('keydown', handleBSODKeydown);
    }

    function handleBSODKeydown() {
        document.removeEventListener('keydown', handleBSODKeydown);
        bsod.classList.add('hidden');
        showFileExplorer();
    }

    function showFileExplorer() {
        fileExplorer.classList.remove('hidden');
        const fakeFiles = [
            'important_document.txt',
            'family_photos/',
            'super_secret_files/',
            'not_a_virus.exe',
            'my_bank_details.csv'
        ];
        explorerContent.innerHTML = fakeFiles.map(file => `<p>${file}</p>`).join('');
        closeExplorerButton.addEventListener('click', closeFileExplorer);
    }

    function closeFileExplorer() {
        fileExplorer.classList.add('hidden');
        showWebcamActivation();
    }

    function showWebcamActivation() {
        webcamIndicator.classList.remove('hidden');
        setTimeout(() => {
            webcamIndicator.classList.add('hidden');
            showSystemRestore();
        }, 3000);
    }

    function showSystemRestore() {
        systemRestore.classList.remove('hidden');
        let progress = 0;
        const restoreInterval = setInterval(() => {
            progress += 5;
            restoreProgress.style.width = progress + '%';
            if (progress < 30) {
                restoreStatus.textContent = 'Preparing restore points...';
            } else if (progress < 70) {
                restoreStatus.textContent = 'Restoring system files...';
            } else if (progress < 95) {
                restoreStatus.textContent = 'Finalizing restore...';
            } else {
                restoreStatus.textContent = 'Restore complete.';
                clearInterval(restoreInterval);
                setTimeout(() => {
                    systemRestore.classList.add('hidden');
                    showPasswordPrompt();
                }, 2000);
            }
        }, 200);
    }

    function showPasswordPrompt() {
        passwordPrompt.classList.remove('hidden');
        submitPasswordButton.addEventListener('click', checkPassword);
        adminPasswordInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                checkPassword();
            }
        });
    }

    function checkPassword() {
        const password = adminPasswordInput.value;
        if (password.length > 0) {
            passwordPrompt.classList.add('hidden');
            showFirewallBlock();
        } else {
            passwordError.classList.remove('hidden');
            setTimeout(() => {
                passwordError.classList.add('hidden');
            }, 1500);
        }
    }

    // New Scenes Logic
    function showFirewallBlock() {
        firewallBlock.classList.remove('hidden');
        firewallOkButton.addEventListener('click', () => {
            firewallBlock.classList.add('hidden');
            showScreenRotate();
        });
    }

    function showScreenRotate() {
        document.body.classList.add('rotate-screen');
        setTimeout(() => {
            document.body.classList.remove('rotate-screen');
            showKeyboardLock();
        }, 2000);
    }

    function showKeyboardLock() {
        keyboardLock.classList.remove('hidden');
        document.addEventListener('keydown', handleKeyboardLock);
        setTimeout(() => {
            keyboardLock.classList.add('hidden');
            document.removeEventListener('keydown', handleKeyboardLock);
            showDeletePrompt();
        }, 3000);
    }

    function handleKeyboardLock(e) {
        e.preventDefault();
        e.stopPropagation();
        keyboardLock.classList.add('shake');
        setTimeout(() => {
            keyboardLock.classList.remove('shake');
        }, 500);
    }

    function showDeletePrompt() {
        deletePrompt.classList.remove('hidden');
        deleteYesButton.addEventListener('click', () => {
            deletePrompt.classList.add('hidden');
            showRebootScreen();
        });
        deleteNoButton.addEventListener('click', () => {
            deletePrompt.classList.add('hidden');
            showRebootScreen();
        });
    }

    function showRebootScreen() {
        rebootScreen.classList.remove('hidden');
        setTimeout(() => {
            rebootScreen.classList.add('hidden');
            showGotcha();
        }, 4000);
    }

    function showGotcha() {
        gotcha.classList.remove('hidden');
        boingSound.play();

        setTimeout(() => {
            gotcha.style.opacity = 0;
            setTimeout(() => {
                gotcha.classList.add('hidden');
                showCredits();
            }, 2000);
        }, 3000);
    }

    function showCredits() {
        creditsScreen.classList.remove('hidden');
        setTimeout(() => {
            creditsScreen.style.opacity = 1;
        }, 100);
    }

    const styleSheet = document.styleSheets && document.styleSheets.length > 0 ? document.styleSheets[0] : null;
    if (styleSheet) {
        styleSheet.insertRule(`
            .shake {
                animation: shake 0.5s;
            }
        `, styleSheet.cssRules.length);

        styleSheet.insertRule(`
            @keyframes shake {
                0% { transform: translate(1px, 1px) rotate(0deg); }
                10% { transform: translate(-1px, -2px) rotate(-1deg); }
                20% { transform: translate(-3px, 0px) rotate(1deg); }
                30% { transform: translate(3px, 2px) rotate(0deg); }
                40% { transform: translate(1px, -1px) rotate(1deg); }
                50% { transform: translate(-1px, 2px) rotate(-1deg); }
                60% { transform: translate(-3px, 1px) rotate(0deg); }
                70% { transform: translate(3px, 1px) rotate(-1deg); }
                80% { transform: translate(-1px, -1px) rotate(1deg); }
            }
        `, styleSheet.cssRules.length);
    }
});
