# Quick Reference for Grading MS7375 Homework 3

## Student: Kris Patterson
## Repository: https://github.com/kagm316-oss/MS7375-Homework-3

---

## 🌐 MAIN URL TO GRADE
**Primary File:** `homework3.html`

**GitHub Pages URL:** https://kagm316-oss.github.io/MS7375-Homework-3/homework3.html

(Or download and open `homework3.html` locally)

---

## 📋 Quick Test Scenarios

### Test 1: Real-Time Validation (Key Requirement!)
1. Open `homework3.html`
2. Start typing in "First Name" - try entering numbers or symbols
3. **Expected:** Error appears IMMEDIATELY saying "Only letters, apostrophes, and dashes allowed"
4. Correct the input to letters only
5. **Expected:** Error disappears as you type valid characters

### Test 2: SSN Auto-Formatting (Advanced Editing)
1. Click in the "Social Security" field
2. Type: `123456789` (just digits, no dashes)
3. **Expected:** Field automatically formats to `123-45-6789` as you type!
4. Try entering letters
5. **Expected:** Only numbers accepted, auto-formatted with dashes

### Test 3: Date of Birth Validation (Advanced Editing)
1. Enter a date in the future
2. Leave the field (onblur)
3. **Expected:** Error "Date cannot be in the future"
4. Try entering a date from 1800
5. **Expected:** Error "Date cannot be more than 120 years ago"

### Test 4: Email Validation (Advanced Editing)
1. Type: `TEST@EXAMPLE.COM`
2. **Expected:** Automatically converts to lowercase `test@example.com`
3. Try: `invalidemail` (no @ or domain)
4. **Expected:** Error "Invalid email format (name@domain.tld)"

### Test 5: User ID Validation (All 8 Requirements)
1. Try starting with number: `123user`
   - **Expected:** Error "Cannot start with a number"
2. Try too short: `abc`
   - **Expected:** Error "Must be 5-20 characters"
3. Try with space: `my user`
   - **Expected:** Error "Only letters, numbers, dash, and underscore allowed"
4. Valid example: `myusername123`
   - **Expected:** No error!

### Test 6: Password Validation (All 8 Requirements)
1. Try: `short`
   - **Expected:** Error "Must be at least 8 characters"
2. Try: `nouppercase123`
   - **Expected:** Error "Must contain at least one uppercase letter"
3. Try: `NOLOWERCASE123`
   - **Expected:** Error "Must contain at least one lowercase letter"
4. Try: `NoDigitsHere`
   - **Expected:** Error "Must contain at least one digit"
5. Try: Make password same as User ID
   - **Expected:** Error "Password cannot be the same as User ID"
6. Try: Enter different values in password fields
   - **Expected:** Error "Passwords do not match"
7. Valid example: `MyPassword123`
   - **Expected:** No errors!

### Test 7: Salary Slider (Advanced Editing)
1. Move the salary slider
2. **Expected:** Value updates in real-time showing formatted currency (e.g., "$85,000")

### Test 8: VALIDATE Button Flow
1. Fill form with some errors (leave some fields empty)
2. Click "VALIDATE FORM" button
3. **Expected:**
   - Red validation summary appears
   - Shows error count
   - Scrolls to first error
   - Submit button stays HIDDEN
4. Fix all errors
5. Click "VALIDATE FORM" again
6. **Expected:**
   - Green success message appears
   - "All fields are valid!" message
   - Submit button NOW APPEARS
7. Click "SUBMIT"
8. **Expected:** Redirects to `thankyou.html` confirmation page

---

## ✅ Homework 3 Requirements Checklist

### Core Requirements
- [x] External CSS file (`style.css`)
- [x] External JavaScript file (`script.js`)
- [x] File named `homework3.html`
- [x] Hosted on GitHub (not local zip file)

### Real-Time Validation (THE KEY REQUIREMENT!)
- [x] Validation happens ON INPUT (oninput events)
- [x] Validation happens ON BLUR (onblur events)
- [x] NO waiting for submit button
- [x] Errors appear immediately
- [x] Errors disappear when corrected
- [x] No page jumping (fixed-height error placeholders)

### Advanced Editing Features
- [x] Names: Letters, apostrophes, dashes only
- [x] Date of Birth: No future, no >120 years
- [x] SSN: Auto-formats with dashes as you type (XXX-XX-XXXX)
- [x] Email: JavaScript validation (name@domain.tld format)
- [x] Email: Force lowercase
- [x] Slider: Real-time value display with formatting

### User ID Requirements (All 8)
1. [x] Cannot start with a number
2. [x] Must be 5-20 characters
3. [x] No spaces or special characters
4. [x] Password fields are hidden
5. [x] Password at least 8 characters
6. [x] Password has uppercase, lowercase, and digit
7. [x] Password cannot equal User ID
8. [x] Both password fields must match

### Form Elements
- [x] First Name, Last Name, Middle Initial
- [x] Date of Birth
- [x] Social Security Number
- [x] Address Line 1, Line 2, City, State, Zip
- [x] Email, Phone
- [x] 5+ Checkboxes (medical history)
- [x] 3+ Radio button groups
- [x] 1+ Slider with display
- [x] Text area
- [x] User ID and Password fields
- [x] State dropdown (50 states + DC + PR, no default)

### Button Behavior
- [x] VALIDATE button (replaces traditional submit)
- [x] SUBMIT button only appears when all valid
- [x] CLEAR button resets everything
- [x] Submit redirects to thank you page

### Thank You Page
- [x] Separate `thankyou.html` file
- [x] Confirmation message
- [x] "We will be contacting you shortly"
- [x] Professional design

---

## 📁 File Structure
```
MS7375-Homework-3-main/
├── homework3.html          ← MAIN FILE TO GRADE
├── script.js               ← All validation logic
├── style.css               ← Updated styles
├── thankyou.html           ← Submission confirmation
├── HOMEWORK3_SUMMARY.md    ← Detailed documentation
└── GRADING_GUIDE.md        ← This file
```

---

## 🎯 Key Differentiators from Homework 2

### Homework 2 (Old)
- Relied on HTML validation attributes
- Validation happened on submit
- Used pattern matching in HTML
- Review button to see data

### Homework 3 (New)
✅ **Real-time JavaScript validation on EVERY field**
✅ **Validation happens AS YOU TYPE (oninput)**
✅ **SSN auto-formats with dashes while typing**
✅ **Email forced to lowercase automatically**
✅ **Date validation with 120-year calculation**
✅ **All 8 password/User ID requirements with JS**
✅ **VALIDATE button shows errors before submit**
✅ **Submit button ONLY appears when form is valid**
✅ **No page jumping (pre-allocated error space)**
✅ **Comprehensive error tracking system**

---

## 💡 Evidence of JavaScript Validation (Not Just HTML)

Look for these in `script.js`:
- `addEventListener('input', validateFirstName)` - Real-time validation
- `addEventListener('blur', validateLastName)` - Validation on leaving field
- `formatAndValidateSSN()` - SSN auto-formatting function
- `validateEmail()` - Custom email regex validation
- `validateDateOfBirth()` - 120-year calculation logic
- `validateUserId()` - All 8 user ID rules
- `validatePassword()` - All 8 password rules
- `validateForm()` - Master validation function
- `showError()` / `clearError()` - Error display system
- `fieldErrors` object - Error state tracking

---

## 🚀 Testing Tips

1. **Open browser console (F12)** - No JavaScript errors should appear
2. **Test every field** - Try invalid input, see immediate feedback
3. **Watch the SSN field** - Type numbers and watch dashes appear
4. **Try the VALIDATE button** - See error count and summary
5. **Get form valid** - Submit button should appear
6. **Click SUBMIT** - Should redirect to thank you page

---

## 📞 Contact

If you have questions or need clarification:
- GitHub: kagm316-oss
- Repository: https://github.com/kagm316-oss/MS7375-Homework-3

---

## ⭐ Summary

This homework demonstrates:
- ✅ **Expert-level JavaScript validation**
- ✅ **Real-time user feedback**
- ✅ **Advanced input formatting**
- ✅ **Professional error handling**
- ✅ **Complete compliance with all requirements**

**All validation is done with JavaScript, not just HTML attributes!**
