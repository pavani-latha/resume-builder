const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const summaryInput = document.getElementById('summary');
const declarationInput = document.getElementById('declaration');

const educationSection = document.getElementById('education-section');
const experienceSection = document.getElementById('experience-section');
const languagesSection = document.getElementById('languages-section');

const previewName = document.getElementById('preview-name');
const previewEmail = document.getElementById('preview-email');
const previewPhone = document.getElementById('preview-phone');
const previewSummary = document.getElementById('preview-summary');
const previewEducation = document.getElementById('preview-education');
const previewExperience = document.getElementById('preview-experience');
const previewSkills = document.getElementById('preview-skills');
const previewLanguages = document.getElementById('preview-languages');
const previewDeclaration = document.getElementById('preview-declaration');

const progressBar = document.getElementById('progress-bar');
const templateSelector = document.getElementById('template-selector');

function updatePreview() {
  previewName.textContent = nameInput.value.trim() || 'Your Name';
  previewEmail.textContent = emailInput.value.trim();
  previewPhone.textContent = phoneInput.value.trim();
  previewSummary.textContent = summaryInput.value.trim();
  previewDeclaration.textContent = declarationInput.value.trim();

  // Education
  previewEducation.innerHTML = '';
  document.querySelectorAll('.education-input').forEach(input => {
    if (input.value.trim()) {
      const li = document.createElement('li');
      li.textContent = input.value.trim();
      previewEducation.appendChild(li);
    }
  });

  // Experience
  previewExperience.innerHTML = '';
  document.querySelectorAll('.experience-input').forEach(input => {
    if (input.value.trim()) {
      const li = document.createElement('li');
      li.textContent = input.value.trim();
      previewExperience.appendChild(li);
    }
  });

  // Skills
  previewSkills.innerHTML = '';
  document.querySelectorAll('.skills input:checked').forEach(skill => {
    const li = document.createElement('li');
    li.textContent = skill.value.trim();
    previewSkills.appendChild(li);
  });

  // Languages
  previewLanguages.innerHTML = '';
  document.querySelectorAll('.language-input').forEach(input => {
    if (input.value.trim()) {
      const li = document.createElement('li');
      li.textContent = input.value.trim();
      previewLanguages.appendChild(li);
    }
  });

  updateProgress();
}

// Listeners
[nameInput, emailInput, phoneInput, summaryInput, declarationInput].forEach(input =>
  input.addEventListener('input', updatePreview)
);

document.querySelectorAll('.skills input').forEach(input =>
  input.addEventListener('change', updatePreview)
);

document.getElementById('add-education').addEventListener('click', () => {
  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Degree, Institution, Year';
  input.className = 'education-input';
  input.addEventListener('input', updatePreview);
  educationSection.appendChild(input);
});

document.getElementById('add-experience').addEventListener('click', () => {
  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Position, Company, Year';
  input.className = 'experience-input';
  input.addEventListener('input', updatePreview);
  experienceSection.appendChild(input);
});

document.getElementById('add-language').addEventListener('click', () => {
  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Language';
  input.className = 'language-input';
  input.addEventListener('input', updatePreview);
  languagesSection.appendChild(input);
});

document.getElementById('add-skill-btn').addEventListener('click', () => {
  const skillInput = document.getElementById('custom-skill');
  const skillName = skillInput.value.trim();
  if (skillName) {
    const newLabel = document.createElement('label');
    const newCheckbox = document.createElement('input');
    newCheckbox.type = 'checkbox';
    newCheckbox.value = skillName;
    newCheckbox.checked = true;
    newCheckbox.addEventListener('change', updatePreview);
    newLabel.appendChild(newCheckbox);
    newLabel.append(` ${skillName}`);
    document.querySelector('.skills').appendChild(newLabel);
    skillInput.value = '';
    updatePreview();
  }
});

document.getElementById('clear-btn').addEventListener('click', () => {
  document.getElementById('resume-form').reset();
  educationSection.innerHTML = '<input type="text" class="education-input" placeholder="Degree, Institution, Year">';
  experienceSection.innerHTML = '<input type="text" class="experience-input" placeholder="Position, Company, Year">';
  languagesSection.innerHTML = '<input type="text" class="language-input" placeholder="Language">';
  document.querySelectorAll('.skills input').forEach(input => input.checked = false);
  updatePreview();
});

document.getElementById('download-btn').addEventListener('click', () => {
  updatePreview();
  const preview = document.getElementById('resume-preview');
  html2canvas(preview, { scale: 2 }).then(canvas => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jspdf.jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = 210;
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('resume.pdf');
  });
});

templateSelector.addEventListener('change', () => {
  const selected = templateSelector.value;
  const preview = document.getElementById('resume-preview');
  preview.className = 'resume-preview ' + selected;
});

function updateProgress() {
  let total = 5 + document.querySelectorAll('.education-input').length + document.querySelectorAll('.experience-input').length + document.querySelectorAll('.skills input').length + document.querySelectorAll('.language-input').length;
  let filled = 0;
  if (nameInput.value.trim()) filled++;
  if (emailInput.value.trim()) filled++;
  if (phoneInput.value.trim()) filled++;
  if (summaryInput.value.trim()) filled++;
  if (declarationInput.value.trim()) filled++;
  document.querySelectorAll('.education-input').forEach(input => {
    if (input.value.trim()) filled++;
  });
  document.querySelectorAll('.experience-input').forEach(input => {
    if (input.value.trim()) filled++;
  });
  document.querySelectorAll('.skills input:checked').forEach(input => filled++);
  document.querySelectorAll('.language-input').forEach(input => {
    if (input.value.trim()) filled++;
  });
  progressBar.style.width = `${(filled / total) * 100}%`;
}

updatePreview();
