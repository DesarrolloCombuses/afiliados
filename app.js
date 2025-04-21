// Configuración de Firebase (REEMPLAZA CON TUS DATOS)
const firebaseConfig = {
    apiKey: "AIzaSyACOeoU8xXUuzCYrPxONmeBgImfQd63UOA",
    authDomain: "basedatoscheck.firebaseapp.com",
    projectId: "basedatoscheck",
    storageBucket: "basedatoscheck.appspot.com",
    messagingSenderId: "580954254341",
    appId: "1:580954254341:web:684651c6c8f55449d8006c"
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Vistas
const views = {
    login: `
        <div class="auth-container">
            <div class="auth-header">
                <h2><i class="fas fa-sign-in-alt me-2"></i>Iniciar Sesión</h2>
            </div>
            <div class="auth-body">
                <div id="error-message" class="alert alert-danger d-none"></div>
                
                <form id="login-form">
                    <div class="mb-4">
                        <label for="login-email" class="form-label">Correo Electrónico</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="fas fa-envelope"></i></span>
                            <input type="email" class="form-control" id="login-email" required>
                        </div>
                    </div>
                    
                    <div class="mb-4">
                        <label for="login-password" class="form-label">Contraseña</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="fas fa-lock"></i></span>
                            <input type="password" class="form-control" id="login-password" required>
                        </div>
                    </div>
                    
                    <div class="d-grid mb-3">
                        <button type="submit" class="btn btn-primary btn-lg">
                            <i class="fas fa-sign-in-alt me-2"></i>Ingresar
                        </button>
                    </div>
                    
                    <div class="text-center mb-3">
                        <a href="#" id="forgot-password" class="text-decoration-none">¿Olvidaste tu contraseña?</a>
                    </div>
                    
                    <div class="text-center mt-4">
                        ¿No tienes cuenta? <a href="#" id="go-to-register" class="text-decoration-none fw-bold">Regístrate aquí</a>
                    </div>
                </form>
            </div>
        </div>
    `,
    
    register: `
        <div class="auth-container">
            <div class="auth-header">
                <h2><i class="fas fa-user-plus me-2"></i>Crear Cuenta</h2>
            </div>
            <div class="auth-body">
                <div id="error-message" class="alert alert-danger d-none"></div>
                
                <form id="register-form">
                    <div class="mb-4">
                        <label for="register-email" class="form-label">Correo Electrónico</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="fas fa-envelope"></i></span>
                            <input type="email" class="form-control" id="register-email" required>
                        </div>
                    </div>
                    
                    <div class="mb-4">
                        <label for="register-password" class="form-label">Contraseña</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="fas fa-lock"></i></span>
                            <input type="password" class="form-control" id="register-password" required>
                        </div>
                        <div class="form-text">Mínimo 6 caracteres</div>
                    </div>
                    
                    <div class="mb-4">
                        <label for="register-confirm-password" class="form-label">Confirmar Contraseña</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="fas fa-lock"></i></span>
                            <input type="password" class="form-control" id="register-confirm-password" required>
                        </div>
                    </div>
                    
                    <div class="d-grid mb-3">
                        <button type="submit" class="btn btn-primary btn-lg">
                            <i class="fas fa-user-plus me-2"></i>Registrarse
                        </button>
                    </div>
                    
                    <div class="text-center mt-4">
                        ¿Ya tienes cuenta? <a href="#" id="go-to-login" class="text-decoration-none fw-bold">Inicia sesión aquí</a>
                    </div>
                </form>
            </div>
        </div>
    `,
    
    dashboard: `
        <div class="auth-container">
            <div class="auth-header">
                <h2><i class="fas fa-user-circle me-2"></i>Panel de Control</h2>
            </div>
            <div class="auth-body text-center">
                <div class="mb-4">
                    <div class="avatar-circle mb-3">
                        <i class="fas fa-user-circle fa-4x text-primary"></i>
                    </div>
                    <h4 id="user-email" class="mb-4"></h4>
                </div>
                
                <div class="d-grid gap-3">
                    <button id="afiliado-form-btn" class="btn btn-primary btn-lg">
                        <i class="fas fa-user-edit me-2"></i>Registrar Afiliado
                    </button>
                    <button id="logout-btn" class="btn btn-danger">
                        <i class="fas fa-sign-out-alt me-2"></i>Cerrar Sesión
                    </button>
                </div>
            </div>
        </div>
    `,
    
    afiliadoForm: `
        <div class="form-container">
            <div class="form-header">
                <h2><i class="fas fa-user-plus me-2"></i>Registro de Afiliado</h2>
            </div>
            <div class="form-body">
                <div id="error-message" class="alert alert-danger d-none"></div>
                <div id="success-message" class="alert alert-success d-none"></div>
                
                <form id="afiliado-form" class="afiliado-form">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group mb-4">
                                <label for="nombre-completo"><i class="fas fa-user me-2"></i>Nombre Completo</label>
                                <input type="text" class="form-control" id="nombre-completo" required>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group mb-4">
                                <label for="correo-electronico"><i class="fas fa-envelope me-2"></i>Correo Electrónico</label>
                                <input type="email" class="form-control" id="correo-electronico" required>
                            </div>
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group mb-4">
                                <label for="fecha-nacimiento"><i class="fas fa-calendar-alt me-2"></i>Fecha de Nacimiento</label>
                                <input type="date" class="form-control" id="fecha-nacimiento" required>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group mb-4">
                                <label for="numero-celular"><i class="fas fa-phone me-2"></i>Número de Celular</label>
                                <input type="tel" class="form-control" id="numero-celular" required>
                            </div>
                        </div>
                    </div>
                    
                    <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                        <button type="button" id="cancelar-form" class="btn btn-secondary me-md-2">
                            <i class="fas fa-times me-2"></i>Cancelar
                        </button>
                        <button type="submit" class="btn btn-primary">
                            <i class="fas fa-save me-2"></i>Guardar Afiliado
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `
};

// Cargar vista inicial
function loadView(view) {
    document.getElementById('app').innerHTML = views[view];
    
    if (view === 'login') setupLoginView();
    if (view === 'register') setupRegisterView();
    if (view === 'dashboard') setupDashboardView();
    if (view === 'afiliadoForm') setupAfiliadoFormView();
}

// Configurar vista de login
function setupLoginView() {
    document.getElementById('login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                loadView('dashboard');
            })
            .catch(error => {
                showError(error.message);
            });
    });
    
    document.getElementById('go-to-register').addEventListener('click', (e) => {
        e.preventDefault();
        loadView('register');
    });
    
    document.getElementById('forgot-password').addEventListener('click', (e) => {
        e.preventDefault();
        const email = prompt("Ingresa tu correo electrónico para restablecer la contraseña:");
        if (email) {
            auth.sendPasswordResetEmail(email)
                .then(() => {
                    showSuccess("Correo de restablecimiento enviado. Revisa tu bandeja de entrada.");
                })
                .catch(error => {
                    showError(error.message);
                });
        }
    });
}

// Configurar vista de registro
function setupRegisterView() {
    document.getElementById('register-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm-password').value;
        
        if (password !== confirmPassword) {
            showError('Las contraseñas no coinciden');
            return;
        }
        
        if (password.length < 6) {
            showError('La contraseña debe tener al menos 6 caracteres');
            return;
        }
        
        auth.createUserWithEmailAndPassword(email, password)
            .then(() => {
                loadView('dashboard');
            })
            .catch(error => {
                showError(error.message);
            });
    });
    
    document.getElementById('go-to-login').addEventListener('click', (e) => {
        e.preventDefault();
        loadView('login');
    });
}

// Configurar vista del dashboard
function setupDashboardView() {
    const user = auth.currentUser;
    document.getElementById('user-email').textContent = user.email;
    
    document.getElementById('logout-btn').addEventListener('click', () => {
        auth.signOut()
            .then(() => {
                loadView('login');
            })
            .catch(error => {
                showError(error.message);
            });
    });
    
    document.getElementById('afiliado-form-btn').addEventListener('click', () => {
        loadView('afiliadoForm');
    });
}

// Configurar vista del formulario de afiliado
function setupAfiliadoFormView() {
    document.getElementById('cancelar-form').addEventListener('click', () => {
        loadView('dashboard');
    });
    
    document.getElementById('afiliado-form').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const afiliadoData = {
            nombreCompleto: document.getElementById('nombre-completo').value,
            correoElectronico: document.getElementById('correo-electronico').value,
            fechaNacimiento: document.getElementById('fecha-nacimiento').value,
            numeroCelular: document.getElementById('numero-celular').value,
            fechaRegistro: new Date(),
            usuarioRegistro: auth.currentUser.email
        };
        
        // Validación adicional
        if (!afiliadoData.correoElectronico.includes('@')) {
            showError('Por favor ingresa un correo electrónico válido');
            return;
        }
        
        // Guardar en Firestore
        db.collection('afiliados').add(afiliadoData)
            .then(() => {
                showSuccess('Afiliado registrado correctamente');
                document.getElementById('afiliado-form').reset();
            })
            .catch(error => {
                showError('Error al guardar el afiliado: ' + error.message);
            });
    });
}

// Mostrar mensajes de error
function showError(message) {
    const errorDiv = document.getElementById('error-message');
    errorDiv.classList.remove('d-none');
    errorDiv.textContent = message;
    
    setTimeout(() => {
        errorDiv.classList.add('d-none');
    }, 5000);
}

// Mostrar mensajes de éxito
function showSuccess(message) {
    const successDiv = document.getElementById('success-message');
    successDiv.classList.remove('d-none');
    successDiv.textContent = message;
    
    setTimeout(() => {
        successDiv.classList.add('d-none');
    }, 5000);
}

// Escuchar cambios en el estado de autenticación
auth.onAuthStateChanged(user => {
    if (user) {
        loadView('dashboard');
    } else {
        loadView('login');
    }
});

// Cargar vista inicial
loadView('login');