var property = new Array();
var unit = new Array();
var factor = new Array();

property[0] = "Length";
unit[0] = new Array("Meter (m)", "Angstrom (A')", "Astronomical unit (AU)", "Caliber (cal)", "Centimeter (cm)", "Kilometer (km)", "Ell", "Em", "Fathom", "Furlong", "Fermi (fm)", "Foot (ft)", "Inch (in)", "League (int'l)", "League (UK)", "Light year (LY)", "Micrometer (mu-m)", "Mil", "Millimeter (mm)", "Nanometer (nm)", "Mile (int'l nautical)", "Mile (UK nautical)", "Mile (US nautical)", "Mile (US statute)", "Parsec", "Pica (printer)", "Picometer (pm)", "Point (pt)", "Rod", "Yard (yd)");
factor[0] = new Array(1, 1E-10, 1.49598E11, .000254, .01, 1000, 1.143, 4.2323E-03, 1.8288, 201.168, 1E-15, .3048, .0254, 5556, 5556, 9.46055E+15, .000001, .0000254, .001, 1E-9, 1852, 1853.184, 1852, 1609.344, 3.08374E+16, 4.217518E-03, 1E-12, .0003514598, 5.0292, .9144);

property[1] = "Area";
unit[1] = new Array("Square meter (m^2)", "Acre (acre)", "Are", "Barn (barn)", "Hectare", "Rood", "Square centimeter", "Square kilometer", "Circular mil", "Square foot (ft^2)", "Square inch (in^2)", "Square mile (mi^2)", "Square yard (yd^2)");
factor[1] = new Array(1, 4046.856, 100, 1E-28, 10000, 1011.71413184285, .0001, 1000000, 5.067075E-10, 9.290304E-02, 6.4516E-04, 2589988, .8361274);

property[2] = "Mass";
unit[2] = new Array("Kilogram (kgr)", "Gram (gr)", "Milligram (mgr)", "Microgram (mu-gr)", "Carat (metric)(ct)", "Hundredweight (long)", "Hundredweight (short)", "Pound mass (lbm)", "Pound mass (troy)", "Ounce mass (ozm)", "Ounce mass (troy)", "Slug", "Ton (assay)", "Ton (long)", "Ton (short)", "Ton (metric)", "Tonne");
factor[2] = new Array(1, .001, 1e-6, .000000001, .0002, 50.80235, 45.35924, .4535924, .3732417, .02834952, .03110348, 14.5939, .02916667, 1016.047, 907.1847, 1000, 1000);

property[3] = "Temperature";
unit[3] = new Array("Degrees Celsius ('C)", "Degrees Fahrenheit ('F)", "Degrees Kelvin ('K)", "Degrees Rankine ('R)");
factor[3] = new Array(1, 0.555555555555, 1, 0.555555555555);
tempIncrement = new Array(0, -32, -273.15, -491.67);


property[4] = "Volume & Capacity";
unit[4] = new Array("Cubic Meter (m^3)", "Cubic centimeter", "Cubic millimeter", "Acre-foot", "Barrel (oil)", "Board foot", "Bushel (US)", "Cup", "Fluid ounce (US)", "Cubic foot", "Gallon (UK)", "Gallon (US,dry)", "Gallon (US,liq)", "Gill (UK)", "Gill (US)", "Cubic inch (in^3)", "Liter (new)", "Liter (old)", "Ounce (UK,fluid)", "Ounce (US,fluid)", "Peck (US)", "Pint (US,dry)", "Pint (US,liq)", "Quart (US,dry)", "Quart (US,liq)", "Stere", "Tablespoon", "Teaspoon", "Ton (register)", "Cubic yard");
factor[4] = new Array(1, .000001, .000000001, 1233.482, .1589873, .002359737, .03523907, .0002365882, .00002957353, .02831685, .004546087, .004404884, .003785412, .0001420652, .0001182941, .00001638706, .001, .001000028, .00002841305, .00002957353, 8.8097680E-03, .0005506105, 4.7317650E-04, .001101221, 9.46353E-04, 1, .00001478676, .000004928922, 2.831685, .7645549);

property[5] = "Volume Flow";
unit[5] = new Array("Cubic meter/second", "Cubic foot/second", "Cubic foot/minute", "Cubic inches/minute", "Gallons (US,liq)/minute)");
factor[5] = new Array(1, .02831685, .0004719474, 2.731177E-7, 6.309020E-05 ,367.021644,);

property[6] = "Currency";
unit[6] = new Array("US dollar", "Japanese yen" , "Bulgarian lev" ,"Pkr","Chilean Peso","Euro","Sri Lankan Rupee");

factor[6] = new Array(1,	0.0067009159414991, 0.5037554972318635,0.0045662100456621,0.0010304023617152,0.9852605028769607,0.2836871384762029);




function UpdateUnitMenu(propMenu, unitMenu) {
    // Updates the units displayed in the unitMenu according to the selection of property in the propMenu.
    var i;
    i = propMenu.selectedIndex;
    FillMenuWithArray(unitMenu, unit[i]);
  }
     
  function FillMenuWithArray(myMenu, myArray) {                          
    // Fills the options of myMenu with the elements of myArray.
    // !CAUTION!: It replaces the elements, so old ones will be deleted.
    var i;
    myMenu.length = myArray.length;
    for (i = 0; i < myArray.length; i++) {
      myMenu.options[i].text = myArray[i];
    }
    console.log("i")
  }
  function CalculateUnit(sourceForm, targetForm) {
    // A simple wrapper function to validate input before making the conversion
    var sourceValue = sourceForm.unit_input.value;
  
    // First check if the user has given numbers or anything that can be made to one...
    sourceValue = parseFloat(sourceValue);
    if (!isNaN(sourceValue) || sourceValue == 0) {
      // If we can make a valid floating-point number, put it in the text box and convert!
      sourceForm.unit_input.value = sourceValue;
      ConvertFromTo(sourceForm, targetForm);
    }
  }

  function ConvertFromTo(sourceForm, targetForm) {
    // Converts the contents of the sourceForm input box to the units specified in the targetForm unit menu and puts the result in the targetForm input box.In other words, this is the heart of the whole script...
    var propIndex;
    var targetIndex;
    var sourceFactor;
    var targetIndex;
    var targetFactor;
    var result;
  
    // Start by checking which property we are working in...
    propIndex = document.property_form.the_menu.selectedIndex;
  
    // Let's determine what unit are we converting FROM (i.e. source) and the factor needed to convert that unit to the base unit.
    targetIndex = sourceForm.unit_menu.selectedIndex;
    sourceFactor = factor[propIndex][targetIndex];

    console.log("targetIndex", targetIndex);
    console.log("sourceFactor", sourceFactor);
  
    // Cool! Let's do the same thing for the target unit - the units we are converting TO:
    targetIndex = targetForm.unit_menu.selectedIndex;
    targetFactor = factor[propIndex][targetIndex];

    console.log("targetIndex", targetIndex);
    console.log("targetIndex", targetFactor);
  
    // Simple, huh? let's do the math: a) convert the source TO the base unit: (The input has been checked by the CalculateUnit function).
  
    result = sourceForm.unit_input.value;
    // Handle Temperature increments!
    if (property[propIndex] == "Temperature") {
      result = parseFloat(result) + tempIncrement[targetIndex];
    }
    
     // Again, handle Temperature increments!
     if (property[propIndex] == "Temperature") {
       result = parseFloat(result) - tempIncrement[targetIndex];
     }
    
    // Handle Currency conversion
    // if(property[propIndex] == "Currency"){
    //   result = result / sourceFactor;
    // }else{
    // }
    result = result * sourceFactor;
    
    // not done yet... now, b) use the targetFactor to convert FROM the base unit
    // to the target unit...

 
    // Handle Currency conversion
    // if(property[propIndex] == "Currency"){
    //   result = result * targetFactor;
    // }else{
    // }
    result = result / targetFactor;

  
    // Ta-da! All that's left is to update the target input box:
    targetForm.unit_input.value = result;
  }
  
  // This fragment initializes the property dropdown menu using the data defined above in the 'Data Definitions' section
  window.onload = function(e) {
    FillMenuWithArray(document.property_form.the_menu, property);
    UpdateUnitMenu(document.property_form.the_menu, document.form_A.unit_menu);
    UpdateUnitMenu(document.property_form.the_menu, document.form_B.unit_menu)
  }
  
  // Restricting textboxes to accept numbers + navigational keys only
  document.getElementByClass('numbersonly').addEventListener('keydown', function(e) {
    var key = e.keyCode ? e.keyCode : e.which;
  
    if (!([8, 9, 13, 27, 46, 110, 190].indexOf(key) !== -1 ||
        (key == 65 && (e.ctrlKey || e.metaKey)) || // Select All  
        (key == 67 && (e.ctrlKey || e.metaKey)) || // Copy
        (key == 86 && (e.ctrlKey || e.metaKey)) || // Paste
        (key >= 35 && key <= 40) || // End, Home, Arrows
        (key >= 48 && key <= 57 && !(e.shiftKey || e.altKey)) || // Numeric Keys
        (key >= 96 && key <= 105) // Numpad
        (key == 190) // Numpad
      )) e.preventDefault();
  });
    

