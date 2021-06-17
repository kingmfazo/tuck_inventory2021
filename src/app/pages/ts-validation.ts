 get v_username() {
    return this.registrationForm.get('v_username');
  }
  get v_phone() {
    return this.registrationForm.get('v_phone');
  }
  get v_email() {
    return this.registrationForm.get('v_email');
  }

  get v_password() {
    return this.registrationForm.get('v_password');
  }

  public errorMessages = {
    v_username: [
      { type: 'required', message: 'Username is required' },
      {
        type: 'maxlength',
        message: 'Username cant be longer than 50 characters',
      },
    ],
    v_phone: [
      { type: 'required', message: 'Phone number is required' },
      {
        type: 'maxlength',
        message: 'Phone Number cant be longer than 9 characters',
      },
    ],
    v_email: [
      { type: 'required', message: 'Email is required' },
      {
        type: 'pattern',
        message: 'Please enter a valid email address',
      },
    ],

    v_password: [
      {
        type: 'minlength',
        message: 'Username must be at least 5 characters long.',
      },
      { type: 'required', message: 'Password is required' },
      {
        type: 'pattern',
        message: 'Password must have ....',
      },
    ],
  };

  registrationForm = this.formBuilder.group({
    v_username: ['', [Validators.required, Validators.maxLength(50)]],
    v_phone: ['', [Validators.required, Validators.maxLength(9)]],
    v_email: [
      '',
      [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
      ],
    ],

    v_password: [
      '',
      [
        Validators.minLength(5),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
      ],
    ],
  });