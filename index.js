import $ from 'jquery';
import "materialize-css";
import listjs from "list.js"

const CROSSWALK_PAGE = '#crosswalk-page';
const PROPERTIES_PAGE = '#properties-page';

$(function () {

    $('.button-collapse').sideNav();
    $('.parallax').parallax();
    $('.collapsible').collapsible();
    $('.carousel.carousel-slider').carousel({
        fullWidth: true
    });
    $('.materialboxed').materialbox();
    $('.scrollspy').scrollSpy();
    $('.tap-target').tapTarget('open');

    if (localStorage.getItem('cookieconsent') === 'true') {
        $('#cookies').hide()
    }

    if ( $(CROSSWALK_PAGE).length ) {
        datasetPageFiltering();
    }

    if ( $(PROPERTIES_PAGE).length ) {
        propertiesPageFiltering();
    }
}); // end of document ready

function propertiesPageFiltering() {
    let options = {
        valueNames: ['name', 'functional', 'operational', 'marginality']
    };

    var propertyList = new listjs('properties-table', options);

    $('#filter-minimum').click(function () {
        propertyList.filter(function (item) {
            if (item.values().marginality == "minimum") {
                return true;
            } else {
                return false;
            }
        });
        return false;
    });

    $('#filter-recommended').click(function () {
        propertyList.filter(function (item) {
            if (item.values().marginality == "recommended") {
                return true;
            } else {
                return false;
            }
        });
        return false;
    });

    $('#filter-optional').click(function () {
        propertyList.filter(function (item) {
            if (item.values().marginality == "optional") {
                return true;
            } else {
                return false;
            }
        });
        return false;
    });

    $('#filter-none').click(function () {
        propertyList.filter();
        return false;
    });

}

function datasetPageFiltering() {

    var filterCheckboxes = $('#resources-search input[type="checkbox"]');
    filterCheckboxes.on('change', function () {

        var selectedFilters = [];

        filterCheckboxes.filter(':checked').each(function () {
            selectedFilters.push(this.value);
        });
        if (selectedFilters.length <= 0) {
            $( CROSSWALK_PAGE + ' .resource').removeClass("hidden").addClass("visible");
            return
        }
        // create a collection containing all of the filterable elements
        var filteredResults = $( CROSSWALK_PAGE + ' .resource');
        var notCheckedStandards = $( CROSSWALK_PAGE + ' .resource');

        filteredResults = filteredResults.filter((pos, resource) =>
            selectedFilters.includes(resource.getAttribute('data-id')));

        notCheckedStandards = notCheckedStandards.filter((pos, resource) => $.inArray(resource, filteredResults) === -1);

        notCheckedStandards.removeClass("visible").addClass("hidden");
        $( CROSSWALK_PAGE + ' .resource').filter(filteredResults).removeClass("hidden").addClass("visible");

    });
};