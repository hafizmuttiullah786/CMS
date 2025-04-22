import jsPDF from 'jspdf'
import 'jspdf-autotable'
import autoTable from 'jspdf-autotable'

// Add this type declaration for jsPDF-AutoTable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF
  }
}

export const handleExportPDF = (data: any, fileName: string = 'export') => {
  try {
    const doc = new jsPDF()

    const tableData = {
      'Full Name': data.applicantDetail.fullName || 'N/A',
      City: data.applicantDetail.city || 'N/A',
      Contact: data.applicantDetail.contact || 'N/A',
      Email: data.applicantDetail.email || 'N/A',
      Gender: data.applicantDetail.gender || 'N/A',
      DOB: data.applicantDetail.dob || 'N/A',
      'Postal Address': data.applicantDetail.postalAddress || 'N/A',
      'Employment Status': data.employmentStatus.employmentStatus || 'N/A',
      'Organization Name': data.employmentStatus.organizationName || 'N/A',
      Designation: data.employmentStatus.designation || 'N/A',
      'Area of Work': data.employmentStatus.areaOfWork || 'N/A',
      'Program Name': data.exchangeInfo.programName || 'N/A',
      'Host Institution': data.exchangeInfo.hostInstitution || 'N/A',
      'US Host Institution': data.exchangeInfo.usHostInstitution || 'N/A',
      'Program Completion Date': data.exchangeInfo.programCompletionDate || 'N/A',
      'Summary What': data.executiveSummary.summaryWhat || 'N/A',
      'Summary Where': data.executiveSummary.summaryWhere || 'N/A',
      'Summary When': data.executiveSummary.summaryWhen || 'N/A',
      'Summary How': data.executiveSummary.summaryHow || 'N/A',
      'Summary Why': data.executiveSummary.summaryWhy || 'N/A',
      'Summary Who': data.executiveSummary.summaryWho || 'N/A',
      'Direct Beneficiaries': data.executiveSummary.summaryDirectBeneficiaries || 'N/A',
      'Indirect Beneficiaries': data.executiveSummary.summaryInDirectBeneficiaries || 'N/A',
      'Project Title': data.projectDescription.projectTitle || 'N/A',
      'Project Duration': data.projectDescription.projectDuration || 'N/A',
      'Course Start Date': data.projectDescription.courseStartDate || 'N/A',
      'Course End Date': data.projectDescription.courseEndDate || 'N/A',
      'Proposed Venue': data.projectDescription.proposedVenue || 'N/A',
      'Is Letter Attached': data.projectDescription.letterUrl || 'N/A',
      'Total Training Hours': data.projectDescription.totalTrainingHours || 'N/A',
      'Hours Per Week': data.projectDescription.hoursPerWeek || 'N/A',
      'Days Per Week': data.projectDescription.daysPerWeek || 'N/A',
      'Hours Per Class': data.projectDescription.hoursPerClass || 'N/A',
      'Total Audience': data.projectDescription.totalAudience || 'N/A',
      'Male Audience': data.projectDescription.maleAudience || 'N/A',
      'Female Audience': data.projectDescription.femaleAudience || 'N/A',
      Status: data.status || 'N/A',
      'Created At': new Date(data.createdAt).toLocaleString(), // Formatting date
      'User ID': data.user.id || 'N/A',
      'User Email': data.user.email || 'N/A',
      'User Name': data.user.name || 'N/A',
      'User Contact': data.user.contact || 'N/A',
      'User DOB': data.user.dob || 'N/A',
      'User City': data.user.city || 'N/A',
      'User Employment Region': data.user.employmentReqion || 'N/A',
      'User Status': data.user.status || 'N/A',
      'User Role': data.user.role || 'N/A',
      Deliverables: data.deliverables.join(', '),
      'Monitoring Methods': data.monitoringMethods.join(', '),
      'Project Partners': data.projectPartners
        .map((partner: any) => `Name: ${partner.name}, Role: ${partner.role}`)
        .join(', '),
      'Project Timelines': data.projectTimelines
        .map((timeline: any) => `Title: ${timeline.title}, Date: ${timeline.date}`)
        .join(', '),
      'Module Outlines': data.moduleOutlines
        .map(
          (outline: any) =>
            `Week ${outline.weekNumber}: ${outline.days.map((dayData: any) => `Day ${dayData.dayNumber} : ${dayData.topics} `)}`
        )
        .join(', '),
      Methodology: data.methodologies
        .map((methodology: any) => `${methodology.title}: ${methodology.desc}`)
        .join(', \n'),
      'Project Justification': Object.keys(data.projectJustification)
        .map((justification: any) => `${justification}: ${data.projectJustification[justification]}`)
        .join(', \n')
    }

    const formattedTableData = Object.entries(tableData).map(([key, value]) => [key, value])

    // Add title
    doc.text('Application Data', 14, 20)

    // Generate the table with the data
    doc.autoTable({
      head: [['Field', 'Value']],
      body: formattedTableData,
      startY: 30,
      styles: { fontSize: 10 }
    })

    // Add budget categories tables
    doc.addPage()
    doc.setFontSize(16)
    doc.text('Budget Categories', 14, 15)

    let startY = 25

    data.budgetCategories.forEach((category: any, index: number) => {
      doc.setFontSize(14)
      doc.text(category.title, 14, startY)

      const breakdownsData = category.breakdowns.map((breakdown: any) => [
        breakdown.title,
        breakdown.description,
        breakdown.rate,
        breakdown.actualAmount,
        breakdown.quantityDays
      ])

      doc.autoTable({
        startY: startY + 5,
        head: [['Title', 'Description', 'Rate', 'Actual Amount', 'Quantity/Days']],
        body: breakdownsData,
        margin: { top: 30 + index * 60 }
      })

      startY = (doc as any).lastAutoTable.finalY + 15

      if (startY > 250) {
        doc.addPage()
        startY = 20
      }
    })

    // Save the PDF
    doc.save(`${fileName}.pdf`)
  } catch (e) {
    console.error('Error generating PDF:', e)
  }
}

export const generateThreadsPdf = (data: any) => {
  try {
    const doc = new jsPDF()

    // Title
    doc.setFontSize(14)
    doc.text('Thread Management Report', 14, 10)

    // Define Table Headers
    const headers = [['Title', 'Description', 'User Name', 'Email', 'Contact', 'Status']]

    // Convert Data to Table Rows
    const rows = data.map((item: any) => [
      item.title,
      item.description.replace(/\n/g, ' '), // Remove new lines
      item.user.name,
      item.user.email,
      item.user.contact,
      item.status
    ])

    // AutoTable Config
    doc.autoTable({
      head: headers,
      body: rows,
      startY: 25,
      styles: {
        fontSize: 10,
        cellPadding: 3,
        overflow: 'linebreak', // Ensures text wraps properly
        wordBreak: 'break-word' // Helps with long text
      },
      headStyles: {
        fillColor: [138, 25, 23],
        textColor: [255, 255, 255], // White text for contrast
        fontStyle: 'bold'
      },
      columnStyles: {
        0: { cellWidth: 20 }, // Title
        1: { cellWidth: 60 }, // Description (expanded width)
        2: { cellWidth: 25 }, // User Name
        3: { cellWidth: 35, halign: 'left' }, // Email aligned left
        4: { cellWidth: 20, halign: 'center' }, // Contact centered
        5: { cellWidth: 25, halign: 'center' } // Status centered
      },
      didDrawPage: (data: any) => {
        const pageCount = doc.internal.pages.length - 1 // Get total pages
        doc.setFontSize(10)
        doc.text(`Page ${pageCount}`, 180, doc.internal.pageSize.height - 10)
      }
    })

    // Save PDF
    doc.save('thread_report.pdf')
  } catch (e) {
    console.log('Error generating PDF:', e)
  }
}

export const generateCommentsPdf = (threadId: any, data: any) => {
  try {
    const doc = new jsPDF()

    // Title
    doc.setFontSize(14)
    doc.text(`Thread Comments Report (Thread ID ${threadId})`, 14, 15)

    // Define Table Headers
    const headers = [['Comment', 'Likes', 'Status', 'Author Name', 'Email', 'Contact', 'Created At']]

    // Convert Data to Table Rows
    const rows = data.map((item: any) => [
      item.comment,
      item.likes,
      item.status,
      item.user.name,
      item.user.email,
      item.user.contact,
      new Date(item.createdAt).toLocaleString('en-GB') // Format Date
    ])

    // AutoTable Config
    doc.autoTable({
      head: headers,
      body: rows,
      startY: 25,
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [138, 25, 23] } // #8a1917 color
    })

    // Save PDF
    doc.save('thread_details.pdf')
  } catch (e) {
    console.log('err', e)
  }
}

export const generateImpactStoryPdf = (data: any) => {
  try {
    const doc = new jsPDF('p', 'mm', 'a4') // Portrait mode, A4 size

    // Title
    doc.setFontSize(16)
    doc.text('Impact Stories Report', 14, 15)

    // Define Table Headers
    const headers = [['ID', 'Title', 'Description', 'Status', 'Author', 'Email', 'Contact', 'Created At']]

    // Function to wrap text and prevent overflow
    const wrapText = (text: any, maxLength = 200) => {
      if (!text) return ''
      if (text.length > maxLength) return text.substring(0, maxLength) + '...' // Truncate long text
      return text
    }

    // Convert Data to Table Rows
    const rows = data.map((story: any) => [
      story.id,
      wrapText(story.title, 30), // Title limited to 30 chars
      wrapText(story.description, 150), // Description limited to 150 chars
      story.status,
      wrapText(story.user.name, 25), // Author name limited
      wrapText(story.user.email, 30), // Email limited to avoid overflow
      story.user.contact,
      new Date(story.createdAt).toLocaleString('en-GB') // Format Date
    ])

    // AutoTable Config
    doc.autoTable({
      head: headers,
      body: rows,
      startY: 25,
      styles: {
        fontSize: 10,
        cellPadding: 3,
        overflow: 'linebreak' // Ensures long text wraps properly
      },
      columnStyles: {
        0: { cellWidth: 10 }, // ID (small)
        1: { cellWidth: 35 }, // Title (medium)
        2: { cellWidth: 65 }, // Description (large, wraps text)
        3: { cellWidth: 20 }, // Status (small)
        4: { cellWidth: 30 }, // Author (medium)
        5: { cellWidth: 35 }, // Email (large)
        6: { cellWidth: 25 }, // Contact (medium)
        7: { cellWidth: 30 } // Created At (medium)
      },
      headStyles: {
        fillColor: [138, 25, 23], // #8a1917 color
        fontSize: 11,
        halign: 'center'
      },
      bodyStyles: {
        fontSize: 10
      },
      theme: 'grid', // Adds better table structure
      margin: { top: 25 },
      pageBreak: 'auto' // Automatically inserts page breaks when necessary
    })

    // Save PDF
    doc.save('impact_stories_report.pdf')
  } catch (e) {
    console.log('err', e)
  }
}
